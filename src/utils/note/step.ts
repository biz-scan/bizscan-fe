import type { ActionNoteDetailItem } from '@/types/note.type';

export function splitSteps(steps: ActionNoteDetailItem[]) {
  return {
    completedSteps: steps.filter((s) => s.isCompleted),
    inProgressSteps: steps.filter((s) => !s.isCompleted),
  };
}
