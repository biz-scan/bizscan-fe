import { useAppQuery } from '@/apis/apiHooks';
import { getActionNotes } from '@/apis/note/note.api';
import { noteKeys } from '@/apis/queryKeys';

export function useActionNotes(storeId: number | undefined, isCompleted: boolean) {
  return useAppQuery(
    noteKeys.list(storeId ?? 0, isCompleted),
    () => getActionNotes({ storeId: storeId!, isCompleted }),
    {
      enabled: !!storeId,
      select: (res) => res.result ?? [],
    }
  );
}
