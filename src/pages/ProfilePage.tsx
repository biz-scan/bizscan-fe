import * as React from 'react';

import Simbol from '@/assets/icons/Logo/Simbol.svg?react';
import FieldLabel from '@/components/ProfilePage/FieldLabel';
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
      <div className="mx-auto w-full max-w-[1348px] px-[120px] py-[120px]">
        <div className="flex items-center gap-3">
          <Simbol className="h-[42px] w-[42px]" />
          <h3 className="text-blue-dark">프로필 설정</h3>
        </div>

        <div className="mt-[48px]">
          <div className="w-full min-h-[718px] rounded-[20px] bg-grey-light shadow-normal px-[105px] py-[105px]">
            <div className="grid grid-cols-[220px_1fr] gap-x-[44px] gap-y-[60px]">
              <FieldLabel text="닉네임" />
              <div className="max-w-[722px]">
                <Input
                  className="typo-p1-regular text-grey-darker bg-grey-light-hover"
                  placeholder="UMC"
                  value={form.nickname}
                  onChange={handleChange('nickname')}
                />
              </div>

              <FieldLabel text="이메일" />
              <div className="max-w-[722px]">
                <Input
                  className="typo-p1-regular text-grey-darker bg-grey-light-hover"
                  placeholder="UMC@gmail.com"
                  value={form.email}
                  onChange={handleChange('email')}
                />
              </div>

              <div className="flex items-start">
                <FieldLabel text="비밀번호 변경" />
              </div>

              <div className="max-w-[722px] space-y-6">
                <div className="grid grid-cols-[240px_1fr] items-center gap-4">
                  <p className="typo-lead-semibold text-grey-darker">
                    현재 비밀번호 입력
                  </p>
                  <Input
                    type="password"
                    className="typo-p1-regular text-grey-darker bg-grey-light-hover"
                    placeholder="***"
                    value={form.currentPassword}
                    onChange={handleChange('currentPassword')}
                  />
                </div>

                <div className="grid grid-cols-[240px_1fr] items-center gap-4">
                  <p className="typo-lead-semibold text-grey-darker">
                    새 비밀번호 입력
                  </p>
                  <Input
                    type="password"
                    className="typo-p1-regular text-grey-darker bg-grey-light-hover"
                    placeholder="***"
                    value={form.newPassword}
                    onChange={handleChange('newPassword')}
                  />
                </div>
              </div>
            </div>

            <div className="mt-[60px] flex justify-end">
              <Button size="lg" onClick={handleSave} disabled={isSaving}>
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