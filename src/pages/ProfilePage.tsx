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

type ProfileForm = {
  nickname: string;
  email: string;
  currentPassword: string;
  newPassword: string;
};

export default function ProfilePage() {
  const { data: meResponse, isLoading } = useMe();
  const me = meResponse?.result as User | undefined;
  const memberId = me?.id;

  const [form, setForm] = React.useState<ProfileForm>({
    nickname: '',
    email: '',
    currentPassword: '',
    newPassword: '',
  });

  React.useEffect(() => {
    if (!me) return;
    setForm((prev) => ({
      ...prev,
      nickname: me.nickname ?? '',
      email: me.email ?? '',
      currentPassword: '',
      newPassword: '',
    }));
  }, [me?.nickname, me?.email]);

  const handleChange =
    (key: keyof ProfileForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const updateProfile = useUpdateProfile(memberId ?? 0);
  const logoutMutation = useLogout();

  const nickname = form.nickname.trim();
  const currentPassword = form.currentPassword.trim();
  const newPassword = form.newPassword.trim();

  const nicknameChanged = !!me && nickname !== (me.nickname ?? '').trim();

  const hasAnyPw = currentPassword.length > 0 || newPassword.length > 0;
  const pwBothFilled = currentPassword.length > 0 && newPassword.length > 0;

  const passwordSectionValid = !hasAnyPw || pwBothFilled;

  const canSave =
    !!memberId &&
    !isLoading &&
    !updateProfile.isPending &&
    passwordSectionValid &&
    (nicknameChanged || pwBothFilled);

  const handleSave = () => {
    if (!memberId) return;

    if (hasAnyPw && !pwBothFilled) return;
    if (!nicknameChanged && !pwBothFilled) return;

    const payload: UpdateMeRequest = {};

    if (nicknameChanged) payload.nickname = nickname;
    if (pwBothFilled) {
      payload.currentPassword = currentPassword;
      payload.newPassword = newPassword;
    }

    updateProfile.mutate(payload, {
      onSuccess: () => {
        setForm((prev) => ({ ...prev, currentPassword: '', newPassword: '' }));
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
                  className="typo-p1-regular bg-grey-light-hover text-grey-darker w-full"
                  placeholder="닉네임을 입력하세요"
                  value={form.nickname}
                  onChange={handleChange('nickname')}
                  disabled={isLoading}
                />
              </div>

              <div className="md:pt-2">
                <FieldLabel text="이메일" />
              </div>

              <div className="min-w-0 md:max-w-[722px]">
                <Input
                  className="typo-p1-regular bg-grey-light-hover text-grey-darker w-full"
                  placeholder="이메일"
                  value={form.email}
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
                      className="typo-p1-regular bg-grey-light-hover text-grey-darker w-full"
                      placeholder="현재 비밀번호를 입력하세요"
                      value={form.currentPassword}
                      onChange={handleChange('currentPassword')}
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
                      className="typo-p1-regular bg-grey-light-hover text-grey-darker w-full"
                      placeholder="새 비밀번호를 입력하세요"
                      value={form.newPassword}
                      onChange={handleChange('newPassword')}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {hasAnyPw && !pwBothFilled ? (
                  <p className="typo-p2-regular text-grey-darker">
                    비밀번호를 변경하려면 현재/새 비밀번호를 모두 입력해주세요.
                  </p>
                ) : null}
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
          <LogoutDialog nickname={form.nickname} onConfirm={handleLogout} />
        </div>
      </div>
    </div>
  );
}
