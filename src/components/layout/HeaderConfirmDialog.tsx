import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/Dialog';

import { Button } from '../ui/Button';

interface HeaderConfirmDialogProps {
  children: ReactNode;
}

export default function HeaderConfirmDialog({ children }: HeaderConfirmDialogProps) {
  const navigate = useNavigate();
  const handleConfirm = () => {
    navigate('/');
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogDescription className="text-center">
            작성 중인 내용이 저장되지 않습니다. <br />
            정말 나가시겠습니까?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="justify-center gap-4 w-full">
          <DialogClose asChild>
            <Button variant="blueLight" className="flex-1">
              취소
            </Button>
          </DialogClose>
          <Button variant="default" className="flex-1" onClick={handleConfirm}>
            나가기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
