import { useAppQuery } from '@/apis/apiHooks';
import { getActionNoteDetail } from '@/apis/note/note.api';
import { noteKeys } from '@/apis/queryKeys';

export function useActionNoteDetail(actionPlanId?: number) {
  return useAppQuery(
    noteKeys.detail(actionPlanId ?? 0),
    () => getActionNoteDetail({ actionPlanId: actionPlanId! }),
    {
      enabled: !!actionPlanId,
      select: (res) => res.result,
    }
  );
}
