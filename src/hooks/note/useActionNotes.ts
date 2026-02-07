import { useAppQuery } from '@/apis/apiHooks';
import { getActionNotes } from '@/apis/note/note.api';
import { noteKeys } from '@/apis/queryKeys';

export function useActionNotes(storeId: number | undefined, isCompleted: boolean) {
  return useAppQuery(
    storeId ? noteKeys.list(storeId, isCompleted) : noteKeys.lists(),
    () => getActionNotes({ storeId: storeId as number, isCompleted }),
    {
      enabled: Number.isFinite(storeId),
      select: (res) => res.result ?? [],
    }
  );
}
