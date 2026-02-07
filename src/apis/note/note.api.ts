import axiosInstance from '@/apis/axiosInstance';
import type {
  ActionNoteDetailDTO,
  ActionNoteListItemDTO,
  ApiResponse,
  PatchActionDetailResultDTO,
} from '@/types/note.type';

export async function getActionNotes(params: {
  storeId: number;
  isCompleted: boolean;
}) {
  const { data } = await axiosInstance.get<ApiResponse<ActionNoteListItemDTO[]>>(
    '/api/v1/action-notes',
    { params }
  );
  return data;
}

export async function getActionNoteDetail(params: { actionPlanId: number }) {
  const { data } = await axiosInstance.get<ApiResponse<ActionNoteDetailDTO>>(
    '/api/v1/action-notes/detail',
    { params }
  );
  return data;
}

export async function patchActionDetail(params: {
  actionDetailId: number;
  isCompleted: boolean;
}) {
  const { data } = await axiosInstance.patch<ApiResponse<PatchActionDetailResultDTO>>(
    '/api/v1/action-notes',
    null,
    { params }
  );
  return data;
}
