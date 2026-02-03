import { toast } from 'sonner';

import { useAppMutation } from '@/apis/apiHooks';
import { getMe, updateMe } from '@/apis/auth/auth';
import useAuthStore from '@/store/useAuthStore';
import type { UpdateMeRequest, UpdateMeResponse } from '@/types/auth.type';

export function useUpdateMe(memberId: number) {
  const { setUser } = useAuthStore();

  return useAppMutation<UpdateMeResponse, UpdateMeRequest>(
    (data) => updateMe(memberId, data),
    {
      onSuccess: async (res) => {
        if (res.isSuccess) {
          const meRes = await getMe();
          if (meRes.isSuccess) {
            setUser(meRes.result);
          }
          toast.success('정보가 수정되었습니다.');
        } else {
          toast.error(res.message || '수정에 실패했습니다.');
        }
      },
    }
  );
}
