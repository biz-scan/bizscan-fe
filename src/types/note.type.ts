export type ApiResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
};

export type TagType = 'GOAL' | 'DIFFICULTY' | 'CATEGORY';

export type NoteTagDTO = {
  tagId: number;
  tagType: TagType;
  content: string; // 예: "#객단가 UP"
};

export type ActionNoteListItemDTO = {
  actionPlanId: number;
  isCompleted: boolean;
  createdAt: string; // "2024-02-04T12:00:00"
  title: string;
  progress: number; // 0~100
  nextActionDetailTitle: string | null;
  tags: NoteTagDTO[];
};

export type ActionNoteDetailItemDTO = {
  actionDetailId: number;
  step: number;
  title: string;
  description: string;
  expectedOutcome: string;
  isCompleted: boolean;
};

export type ActionNoteDetailDTO = {
  actionPlanId: number;
  actionPlanTitle: string;
  tags: NoteTagDTO[];
  reason: string;
  progress: number;
  actionDetails: ActionNoteDetailItemDTO[];
};

export type PatchActionDetailResultDTO = {
  actionDetailId: number;
  isDetailCompleted: boolean;
  progress: number;
  isNoteCompleted: boolean;
};
