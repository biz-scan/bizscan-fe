import * as React from 'react';

import LogoutIcon from '@/assets/icons/Arrow/logout.svg?react';
import { Button } from '@/components/ui/Button';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/Dialog';

interface LogoutDialogProps {
  nickname: string;
  onConfirm: () => void | Promise<void>;
}

export default function LogoutDialog({ nickname, onConfirm }: LogoutDialogProps) {
  const [open, setOpen] = React.useState(false);

  const handleConfirm = async () => {
    await onConfirm();
    setOpen(false);
  };

  const displayName = nickname || 'ooo';

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
        className="w-[544px] h-[303px] max-w-none rounded-[20px] border-0 bg-grey-light shadow-normal px-[48px] py-[40px] flex flex-col"
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
