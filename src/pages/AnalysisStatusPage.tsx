import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stepper from '@/components/AnalysisStatusPage/Stepper';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Button } from '@/components/ui/Button';
import { useAnalysisStatus } from '@/hooks/analysis/useAnalysisStatus';

export function AnalysisStatusPage() {
  const { requestId } = useParams();
  const navigate = useNavigate();

  const { data, error: statusError } = useAnalysisStatus(requestId ?? '');
  const status = data?.result?.status ?? 'REQUEST';

  useEffect(() => {
    if (status === 'COMPLETED') {
      setTimeout(() => {
        navigate(`/analysis/${requestId}`, { replace: true });
      }, 1000);
    }
  }, [status, navigate, requestId]);

  const isError = status === 'FAILED' || !!statusError;

  const getMessage = () => {
    if (statusError) return '상태 조회에 실패했습니다';
    return data?.result?.progressMessage ?? statusText[status];
  };

  return (
    <div className="flex flex-col items-center justify-center h-100% w-full gap-15">
      {!isError && <LoadingSpinner />}
      <div className="flex flex-col items-center justify-center gap-6">
        <Stepper status={isError ? 'FAILED' : status} />
        <h4 className={`bg-clip-text text-transparent ${isError ? 'bg-error' : 'bg-gra2-h'}`}>
          {getMessage()}
        </h4>
        {isError && (
          <Button onClick={() => navigate(0)}>다시 시도</Button>
        )}
      </div>
    </div>
  );
}

const statusText: Record<string, string> = {
  REQUEST: '분석 요청 접수중',
  SWOT_PROCESSING: 'SWOT 분석중',
  ACTION_PLAN_PROCESSING: '액션 플랜 생성중',
  ACTION_DETAIL_PROCESSING: '상세 분석중',
  COMPLETED: '분석 완료',
  FAILED: '분석에 실패했습니다',
};
