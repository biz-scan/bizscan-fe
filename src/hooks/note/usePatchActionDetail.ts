import { toast } from 'sonner';

import { useAppMutation } from '@/apis/apiHooks';
import { patchActionDetail } from '@/apis/note/note.api';
import { queryClient } from '@/apis/queryClient';
import { noteKeys } from '@/apis/queryKeys';
import type { GetActionNoteDetailResponse } from '@/types/note.type';

type Vars = {
  storeId: number;
  actionPlanId: number;
  actionDetailId: number;
  isCompleted: boolean;
};

export function usePatchActionDetail() {
  return useAppMutation(
    ({ actionDetailId, isCompleted }: Vars) =>
      patchActionDetail({ actionDetailId, isCompleted }),
    {
      onMutate: async (vars) => {
        const key = noteKeys.detail(vars.actionPlanId);

        await queryClient.cancelQueries({ queryKey: key });

        const prev = queryClient.getQueryData<GetActionNoteDetailResponse>(key);

        queryClient.setQueryData(key, (cache: GetActionNoteDetailResponse | undefined) => {
          if (!cache) return cache;

          const list = cache.result?.actionDetails ?? [];

          return {
            ...cache,
            result: {
              ...cache.result,
              actionDetails: list.map((item) =>
                item.actionDetailId === vars.actionDetailId
                  ? { ...item, isCompleted: vars.isCompleted }
                  : item
              ),
            },
          };
        });

        return { prev };
      },

      onError: (_err, vars, ctx) => {
        const prev = (ctx as { prev?: GetActionNoteDetailResponse } | undefined)?.prev;
        if (prev !== undefined) queryClient.setQueryData(noteKeys.detail(vars.actionPlanId), prev);

        toast.error('세부 목표 수정에 실패했습니다.');
      },

      onSuccess: (res) => {
        if (!res.isSuccess) toast.error(res.message ?? '수정에 실패했습니다.');
      },

      onSettled: (_res, _err, vars) => {
        queryClient.invalidateQueries({ queryKey: noteKeys.detail(vars.actionPlanId) });
        queryClient.invalidateQueries({ queryKey: noteKeys.list(vars.storeId, false) });
        queryClient.invalidateQueries({ queryKey: noteKeys.list(vars.storeId, true) });
      },
    }
  );
}
