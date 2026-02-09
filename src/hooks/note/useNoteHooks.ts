import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postActionNote } from '@/apis/note/note.api';
import { queryClient } from '@/apis/queryClient';

export function usePostActionNote() {
  return useMutation({
    mutationFn: (actionPlanId: number) => postActionNote(actionPlanId),
    onSuccess: () => {
      toast.success('실행 노트에 성공적으로 담았습니다!');
      queryClient.invalidateQueries({
        queryKey: ['note'],
        refetchType: 'all',
      });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || '노트에 담는 중 오류가 발생했습니다.';
      toast.error(message);
    },
  });
}
