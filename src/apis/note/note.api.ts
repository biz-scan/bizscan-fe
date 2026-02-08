import axiosInstance from '@/apis/axiosInstance';
import type {
  GetActionNotesRequest,
  GetActionNotesResponse,
  GetActionNoteDetailRequest,
  GetActionNoteDetailResponse,
  PatchActionDetailResponse,
} from '@/types/note.type';


export async function getActionNotes(params: GetActionNotesRequest): Promise<GetActionNotesResponse> {
  const res = await axiosInstance.get<GetActionNotesResponse>('/api/v1/action-notes', {
    params,
  });
  return res.data;
}

export async function getActionNoteDetail(
  params: GetActionNoteDetailRequest
): Promise<GetActionNoteDetailResponse> {
  const res = await axiosInstance.get<GetActionNoteDetailResponse>('/api/v1/action-notes/detail', {
    params,
  });
  return res.data;
}


export async function patchActionDetail(params: {
  actionDetailId: number;
  isCompleted: boolean;
}): Promise<PatchActionDetailResponse> {
  const res = await axiosInstance.patch<PatchActionDetailResponse>('/api/v1/action-notes', null, {
    params,
  });
  return res.data;
}
