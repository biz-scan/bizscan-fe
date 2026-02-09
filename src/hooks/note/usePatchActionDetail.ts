import { toast } from 'sonner';

import { useAppMutation } from '@/apis/apiHooks';
import { patchActionDetail } from '@/apis/note/note.api';
import { queryClient } from '@/apis/queryClient';
import { noteKeys } from '@/apis/queryKeys';

type Vars = {
  storeId: number;
  actionPlanId: number;
  actionDetailId: number;
  isCompleted: boolean;
};

export function usePatchActionDetail() {
  return useAppMutation(
    ({ actionDetailId, isCompleted }: Vars) => patchActionDetail({ actionDetailId, isCompleted }),
    {
      onSuccess: (res, vars) => {
        if (!res.isSuccess) {
          toast.error(res.message ?? '수정에 실패했습니다.');
          return;
        }

        queryClient.invalidateQueries({ queryKey: noteKeys.detail(vars.actionPlanId) });
        queryClient.invalidateQueries({ queryKey: noteKeys.list(vars.storeId, false) });
        queryClient.invalidateQueries({ queryKey: noteKeys.list(vars.storeId, true) });

        toast.success('저장되었습니다.');
      },
      onError: () => {
        toast.error('세부 목표 수정에 실패했습니다.');
      },
    }
  );
}
