import * as React from 'react';

import Simbol from '@/assets/icons/Logo/Simbol.svg?react';
import FieldLabel from '@/components/common/FieldLabel';
import LogoutDialog from '@/components/ProfilePage/LogoutDialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

type ProfileForm = {
  nickname: string;
  email: string;
  currentPassword: string;
  newPassword: string;
};

export default function ProfilePage() {
  const [form, setForm] = React.useState<ProfileForm>({
    nickname: '',
    email: '',
    currentPassword: '',
    newPassword: '',
  });

  const [isSaving, setIsSaving] = React.useState(false);

  const handleChange =
    (key: keyof ProfileForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSave = async () => {
    setIsSaving(true);
    try {
      alert('저장되었습니다.');
      setForm((prev) => ({ ...prev, currentPassword: '', newPassword: '' }));
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    alert('로그아웃 되었습니다.');
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
                  placeholder="UMC"
                  value={form.nickname}
                  onChange={handleChange('nickname')}
                />
              </div>

              <div className="md:pt-2">
                <FieldLabel text="이메일" />
              </div>

              <div className="min-w-0 md:max-w-[722px]">
                <Input
                  className="typo-p1-regular bg-grey-light-hover text-grey-darker w-full"
                  placeholder="UMC@gmail.com"
                  value={form.email}
                  onChange={handleChange('email')}
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
                  />
                  </div>
                </div>
              </div>
            </div>

            {/* 저장 */}
            <div className="mt-10 md:mt-[60px] flex justify-end">
              <Button size="lg" onClick={handleSave} disabled={isSaving}>
                저장하기
              </Button>
            </div>
          </div>
        </div>

        {/* 로그아웃 */}
        <div className="mt-8 flex justify-end">
          <LogoutDialog nickname={form.nickname} onConfirm={handleLogout} />
        </div>
      </div>
    </div>
  );
}
