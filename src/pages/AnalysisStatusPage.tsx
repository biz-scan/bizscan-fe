import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { postAnalysis } from '@/apis/analysis/analysis';
import ErrorIcon from '@/assets/icons/Icon/type=error.svg?react';
import Stepper from '@/components/AnalysisStatusPage/Stepper';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Button } from '@/components/ui/Button';
import { useAnalysisStatus } from '@/hooks/analysis/useAnalysisStatus';
import useAuthStore from '@/store/useAuthStore';

const statusText: Record<string, string> = {
  REQUEST: '분석 요청 접수중',
  SWOT_PROCESSING: 'SWOT 분석중',
  ACTION_PLAN_PROCESSING: '액션 플랜 생성중',
  ACTION_DETAIL_PROCESSING: '상세 분석중',
  COMPLETED: '분석 완료',
  FAILED: '분석에 실패했습니다',
};

export function AnalysisStatusPage() {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const { user, storeId: persistedStoreId } = useAuthStore();
  const storeId = user?.storeId || persistedStoreId;
  const [retrying, setRetrying] = useState(false);

  const { data, error: statusError, isLoading } = useAnalysisStatus(requestId ?? '');
  const status = data?.result?.status ?? 'REQUEST';

  console.log('🕵️ 현재 페이지 상태 확인:', {
    requestId,
    status,
    isLoading,
    storeId,
    dataExists: !!data,
  });

  useEffect(() => {
    if (isLoading) return;

    if (status === 'COMPLETED') {
      const timer = setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (!requestId) {
      console.log('데이터 로딩 후에도 requestId가 없어 튕깁니다.');
      navigate('/', { replace: true });
    }
  }, [requestId, status, navigate, isLoading]);

  const isError = !requestId || status === 'FAILED' || !!statusError;

  const getMessage = () => {
    if (statusError) return '상태 조회에 실패했습니다';
    return data?.result?.progressMessage ?? statusText[status];
  };

  const handleRetry = async () => {
    if (!storeId || retrying) return;
    try {
      setRetrying(true);
      const res = await postAnalysis(storeId);
      navigate(`/analyze/${res.result.requestId}`, { replace: true });
    } catch {
      toast.error('재분석 요청에 실패했습니다.');
    } finally {
      setRetrying(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-100% w-full ">
      {isError ? (
        <div className="flex flex-col items-center justify-center gap-8 ">
          <ErrorIcon />
          <div className="flex flex-col items-center gap-3">
            <h4 className="bg-clip-text text-transparent bg-gra2-h text-center">
              AI 분석에 실패했어요
            </h4>
            <p className="text-grey-normal typo-p1-semibold text-center">
              일시적인 오류가 발생했습니다. 아래 버튼을 눌러 다시 시도해 주세요.
            </p>
          </div>
          <Button onClick={handleRetry} disabled={retrying || !storeId}>
            {retrying ? '재시도 중...' : '다시 시도'}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-15">
          <LoadingSpinner />
          <div className="flex flex-col items-center justify-center gap-8">
            <Stepper status={isError ? 'FAILED' : status} />
            <h4 className="bg-clip-text text-transparent bg-gra2-h">{getMessage()}</h4>
          </div>
        </div>
      )}
    </div>
  );
}
