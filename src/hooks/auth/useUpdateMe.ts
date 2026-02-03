import { toast } from 'sonner';

import { useAppMutation } from '@/apis/apiHooks';
import { updateMe } from '@/apis/auth/auth';
import { queryClient } from '@/apis/queryClient';
import { authKeys } from '@/apis/queryKeys';
import type { UpdateMeRequest, UpdateMeResponse } from '@/types/auth.type';

export function useUpdateMe(memberId: number) {
  return useAppMutation<UpdateMeResponse, UpdateMeRequest>((data) => updateMe(memberId, data), {
    onSuccess: (res) => {
      if (res.isSuccess) {
        queryClient.invalidateQueries({ queryKey: authKeys.me() });
        toast.success('변경 사항이 적용되었습니다!');
      } else {
        toast.error(res.message || '변경 사항이 적용에 실패했습니다.');
      }
    },
  });
}
