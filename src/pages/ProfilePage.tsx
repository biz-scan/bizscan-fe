import * as React from 'react';

import LogoutIcon from '@/assets/icons/Arrow/logout.svg?react';
import Simbol from '@/assets/icons/Logo/Simbol.svg?react';
import { Button } from '@/components/ui/Button';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';

type ProfileForm = {
  nickname: string;
  email: string;
  currentPassword: string;
  newPassword: string;
};

function FieldLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className ?? ''}`}>
      <span className="h-[20px] w-[3px] bg-blue-normal" />
      <h5 className="text-blue-normal">{children}</h5>
    </div>
  );
}

function LogoutDialog({
  nickname,
  onConfirm,
}: {
  nickname: string;
  onConfirm: () => void | Promise<void>;
}) {
  const [open, setOpen] = React.useState(false);
  const displayName = nickname || '0000';

  const handleConfirm = async () => {
    await onConfirm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border border-grey-light-active px-4 py-2 typo-p2-semibold text-grey-normal hover:bg-grey-light"
        >
          로그아웃
          <LogoutIcon className="h-4 w-4" />
        </button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="flex h-[303px] w-[544px] max-w-none flex-col rounded-[20px] border-0 bg-grey-light px-[48px] py-[40px] shadow-normal"
      >
        <div className="flex flex-col items-center text-center">
          <h4 className="text-grey-darker">로그아웃</h4>
          <p className="mt-[40px] typo-p1-semibold text-grey-dark">
            {displayName}님, 정말 로그아웃 하시겠습니까?
          </p>
        </div>

        <div className="h-[48px]" />

        <div className="flex justify-center">
          <div className="flex h-[64px] w-[480px] gap-4">
            <DialogClose asChild>
              <Button variant="blueLight" className="h-full flex-1">
                취소
              </Button>
            </DialogClose>
            <Button className="h-full flex-1" onClick={handleConfirm}>
              로그아웃
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function ProfilePage() {
  const [form, setForm] = React.useState<ProfileForm>({
    nickname: '',
    email: '',
    currentPassword: '',
    newPassword: '',
  });
  const [isSaving, setIsSaving] = React.useState(false);

  const handleChange =
    (key: keyof ProfileForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

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
      {/* layout: large gaps(px) on lg+, small gaps(scale) on smaller */}
      <div className="mx-auto w-full max-w-[1348px] px-6 py-[120px] md:px-10 lg:px-[120px]">
        <div className="flex items-center gap-3">
          <Simbol className="h-[42px] w-[42px]" />
          <h3 className="text-blue-dark">프로필 설정</h3>
        </div>

        <div className="mt-[48px]">
          <div className="w-full min-h-[718px] rounded-[20px] bg-grey-light shadow-normal px-6 py-10 md:px-10 md:py-16 lg:px-[105px] lg:py-[105px]">
            <div className="grid grid-cols-1 gap-x-[44px] gap-y-[60px] lg:grid-cols-[220px_1fr]">
              <FieldLabel>닉네임</FieldLabel>
              <div className="min-w-0 max-w-[722px]">
                <Input
                  className="typo-p1-regular bg-grey-light-hover text-grey-darker"
                  placeholder="UMC"
                  value={form.nickname}
                  onChange={handleChange('nickname')}
                />
              </div>

              <FieldLabel>이메일</FieldLabel>
              <div className="min-w-0 max-w-[722px]">
                <Input
                  className="typo-p1-regular bg-grey-light-hover text-grey-darker"
                  placeholder="UMC@gmail.com"
                  value={form.email}
                  onChange={handleChange('email')}
                />
              </div>

              <div className="flex items-start">
                <FieldLabel>비밀번호 변경</FieldLabel>
              </div>

              <div className="min-w-0 max-w-[722px] space-y-6">
                <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-[240px_1fr]">
                  <p className="typo-lead-semibold text-grey-darker">현재 비밀번호 입력</p>
                  <Input
                    className="typo-p1-regular bg-grey-light-hover text-grey-darker"
                    type="password"
                    placeholder="***"
                    value={form.currentPassword}
                    onChange={handleChange('currentPassword')}
                  />
                </div>

                <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-[240px_1fr]">
                  <p className="typo-lead-semibold text-grey-darker">새 비밀번호 입력</p>
                  <Input
                    className="typo-p1-regular bg-grey-light-hover text-grey-darker"
                    type="password"
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
