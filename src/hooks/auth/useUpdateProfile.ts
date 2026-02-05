import { toast } from 'sonner';

import { useAppMutation } from '@/apis/apiHooks';
import { updateMe } from '@/apis/auth/auth';
import { queryClient } from '@/apis/queryClient';
import { authKeys } from '@/apis/queryKeys';
import type { UpdateMeRequest, UpdateMeResponse } from '@/types/auth.type';

export function useUpdateProfile(memberId: number) {
  return useAppMutation<UpdateMeResponse, UpdateMeRequest>((payload) => updateMe(memberId, payload), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
      toast.success('회원 정보가 저장되었습니다.');
    },
    onError: () => {
      toast.error('회원 정보 저장에 실패했습니다.');
    },
  });
}
