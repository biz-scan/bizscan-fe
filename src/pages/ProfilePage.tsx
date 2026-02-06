import * as React from 'react';

import Simbol from '@/assets/icons/Logo/Simbol.svg?react';
import FieldLabel from '@/components/common/FieldLabel';
import LogoutDialog from '@/components/ProfilePage/LogoutDialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useLogout } from '@/hooks/auth/useLogout';
import { useMe } from '@/hooks/auth/useMe';
import { useUpdateProfile } from '@/hooks/auth/useUpdateProfile';
import type { UpdateMeRequest, User } from '@/types/auth.type';

export default function ProfilePage() {
  const { data: meResponse, isLoading } = useMe();
  const me = meResponse?.result as User | undefined;
  const memberId = me?.id ?? 0;

  const [nickname, setNickname] = React.useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');

  const updateProfile = useUpdateProfile(memberId);
  const logoutMutation = useLogout();

  const originNickname = (me?.nickname ?? '').trim();
  const finalNickname = (nickname ?? originNickname).trim();

  const nicknameChanged = nickname !== null && finalNickname !== originNickname;

  const hasPasswordInput = currentPassword.trim().length > 0 || newPassword.trim().length > 0;
  const isPasswordComplete =
    currentPassword.trim().length > 0 && newPassword.trim().length > 0;
  const isPasswordValid = !hasPasswordInput || isPasswordComplete;

  const canSave =
    !!me &&
    !isLoading &&
    !updateProfile.isPending &&
    isPasswordValid &&
    (nicknameChanged || isPasswordComplete);

  const handleSave = () => {
    if (!me) return;
    if (hasPasswordInput && !isPasswordComplete) return;
    if (!nicknameChanged && !isPasswordComplete) return;
    
    const payload: UpdateMeRequest = {};
    
    if (nicknameChanged) payload.nickname = finalNickname;
    
    if (hasPasswordInput) {
      payload.currentPassword = currentPassword.trim() || null;
      payload.newPassword = newPassword.trim() || null;
    }
    
    updateProfile.mutate(payload, {
      onSuccess: () => {
        setCurrentPassword('');
        setNewPassword('');
        setNickname(null);
      },
    });
  };
    
  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
  };

  return (
    <div className="min-h-screen bg-grey-light">
      <div className="mx-auto w-full max-w-[1348px] px-6 py-16 md:px-10 md:py-20 xl:px-[120px] xl:py-[120px]">
        <div className="flex items-center gap-3">
          <Simbol className="h-[42px] w-[42px]" />
          <h3 className="text-blue-dark">프로필 설정</h3>
        </div>

        <div className="mt-12 xl:mt-[48px]">
          <div className="w-full min-h-[718px] rounded-[20px] bg-grey-light shadow-normal px-6 py-10 md:px-10 md:py-14 xl:px-[105px] xl:py-[105px] overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-x-[44px] gap-y-10 md:gap-y-[60px]">
              <div className="md:pt-2">
                <FieldLabel text="닉네임" />
              </div>

              <div className="min-w-0 md:max-w-[722px]">
                <Input
                  key={originNickname}
                  className="typo-p1-regular bg-grey-light-hover text-grey-darker w-full"
                  placeholder="닉네임을 입력하세요"
                  defaultValue={originNickname}
                  onChange={(e) => setNickname(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="md:pt-2">
                <FieldLabel text="이메일" />
              </div>

              <div className="min-w-0 md:max-w-[722px]">
                <Input
                  className="typo-p1-regular bg-grey-light-active text-grey-normal-active w-full"
                  value={me?.email ?? ''}
                  readOnly
                  disabled
                />
              </div>

              <div className="md:pt-2">
                <FieldLabel text="비밀번호 변경" />
              </div>

              <div className="min-w-0 md:max-w-[722px] space-y-6">
                <div className="grid grid-cols-1 min-[1200px]:grid-cols-[240px_1fr] items-center gap-4">
                  <p className="typo-lead-semibold text-grey-darker whitespace-nowrap">
                    현재 비밀번호 입력
                  </p>
                  <div className="min-w-0">
                    <Input
                      type="password"
                      className="typo-p1-regular bg-grey-light-hover text-grey-darker rounded-[8px] w-full"
                      placeholder="현재 비밀번호를 입력하세요"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 min-[1200px]:grid-cols-[240px_1fr] items-center gap-4">
                  <p className="typo-lead-semibold text-grey-darker whitespace-nowrap">
                    새 비밀번호 입력
                  </p>
                  <div className="min-w-0">
                    <Input
                      type="password"
                      className="typo-p1-regular bg-grey-light-hover text-grey-darker rounded-[8px] w-full"
                      placeholder="새 비밀번호를 입력하세요"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 md:mt-[60px] flex justify-end">
              <Button size="lg" onClick={handleSave} disabled={!canSave}>
                저장하기
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <LogoutDialog nickname={finalNickname} onConfirm={handleLogout} />
        </div>
      </div>
    </div>
  );
}
