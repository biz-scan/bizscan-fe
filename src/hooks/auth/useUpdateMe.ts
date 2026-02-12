import { toast } from 'sonner';

import { useAppMutation } from '@/apis/apiHooks';
import { getMe, updateMe } from '@/apis/auth/auth';
import { queryClient } from '@/apis/queryClient';
import { authKeys } from '@/apis/queryKeys';
import useAuthStore from '@/store/useAuthStore';
import type { UpdateMeRequest, UpdateMeResponse } from '@/types/auth.type';

export function useUpdateMe(memberId: number) {
  const { setUser } = useAuthStore();

  return useAppMutation<UpdateMeResponse, UpdateMeRequest>((data) => updateMe(memberId, data), {
    onSuccess: async (res) => {
      if (res.isSuccess) {
        queryClient.invalidateQueries({ queryKey: authKeys.me() });
        const meRes = await getMe();
        if (meRes.isSuccess) {
          setUser(meRes.result);
        }
        toast.success('변경 사항이 적용되었습니다!');
      } else {
        toast.error(res.message || '변경 사항이 적용에 실패했습니다.');
      }
    },
  });
}
