import type { ActionNoteDetailItemDTO } from '@/types/note.type';

export function splitSteps(steps: ActionNoteDetailItemDTO[]) {
  return {
    completedSteps: steps.filter((s) => s.isCompleted),
    inProgressSteps: steps.filter((s) => !s.isCompleted),
  };
}
