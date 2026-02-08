import type { CommonResponse } from './api.type';

export type TagType = 'GOAL' | 'DIFFICULTY' | 'CATEGORY';

export type NoteTag = {
  tagId: number;
  tagType: TagType;
  content: string;
};

export type ActionNoteListItem = {
  actionPlanId: number;
  isCompleted: boolean;
  createdAt: string;
  title: string;
  progress: number;
  nextActionDetailTitle: string | null;
  tags: NoteTag[];
};

export type ActionNoteDetailItem = {
  actionDetailId: number;
  step: number;
  title: string;
  description: string;
  expectedOutcome: string;
  isCompleted: boolean;
};

export type ActionNoteDetail = {
  actionPlanId: number;
  actionPlanTitle: string;
  tags: NoteTag[];
  reason: string;
  progress: number;
  actionDetails: ActionNoteDetailItem[];
};

export type PatchActionDetailResult = {
  actionDetailId: number;
  isDetailCompleted: boolean;
  progress: number;
  isNoteCompleted: boolean;
};

/* REQUEST */
export type GetActionNotesRequest = {
  storeId: number;
  isCompleted: boolean;
};

export type GetActionNoteDetailRequest = {
  actionPlanId: number;
};

export type PatchActionDetailRequest = {
  storeId: number;
  actionPlanId: number;
  actionDetailId: number;
  isCompleted: boolean;
};

/* RESPONSE */
export type GetActionNotesResponse = CommonResponse<ActionNoteListItem[]>;
export type GetActionNoteDetailResponse = CommonResponse<ActionNoteDetail>;
export type PatchActionDetailResponse = CommonResponse<PatchActionDetailResult>;
