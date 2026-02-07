import { useAppQuery } from '@/apis/apiHooks';
import { getActionNoteDetail } from '@/apis/note/note.api';
import { noteKeys } from '@/apis/queryKeys';

export function useActionNoteDetail(actionPlanId: number | undefined) {
  return useAppQuery(
    actionPlanId ? noteKeys.detail(actionPlanId) : noteKeys.details(),
    () => getActionNoteDetail({ actionPlanId: actionPlanId as number }),
    {
      enabled: Number.isFinite(actionPlanId),
      select: (res) => res.result,
    }
  );
}
