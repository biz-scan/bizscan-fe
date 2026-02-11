import { toast } from 'sonner';

import { useAppMutation } from '@/apis/apiHooks';
import { postActionNote } from '@/apis/note/note.api';
import { queryClient } from '@/apis/queryClient';
import { noteKeys } from '@/apis/queryKeys';

export function usePostActionNote() {
  return useAppMutation(
    (actionPlanId: number) => postActionNote(actionPlanId),
    {
      onSuccess: () => {
        toast.success('실행 노트에 성공적으로 담았습니다!');
        queryClient.invalidateQueries({
          queryKey: noteKeys.all,
          refetchType: 'all',
        });
      },
    }
  );
}
