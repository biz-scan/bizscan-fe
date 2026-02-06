import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stepper from '@/components/AnalysisStatusPage/Stepper';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Button } from '@/components/ui/Button';
import { useAnalysisStatus } from '@/hooks/analysis/useAnalysisStatus';
import { useAnalyze } from '@/hooks/analysis/useAnalyze';

export function AnalysisStatusPage() {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const { mutate, error: analyzeError } = useAnalyze();
  const [requestId, setRequestId] = useState('');

  const startAnalysis = () => {
    if (!storeId) return;
    mutate(
      { storeId },
      {
        onSuccess: (res) => {
          setRequestId(res.result.requestId);
        },
      }
    );
  };

  useEffect(() => {
    startAnalysis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId]);

  const { data, error: statusError } = useAnalysisStatus(requestId);
  const status = data?.result?.status ?? 'WAITING';

  useEffect(() => {
    if (status === 'COMPLETED') {
      setTimeout(() => {
        navigate(`/analysis/${requestId}`, { replace: true });
      }, 1000);
    }
  }, [status, navigate, requestId]);

  const hasError = !!analyzeError || !!statusError;
  const isError = status === 'FAILED' || hasError;

  const getMessage = () => {
    if (analyzeError) return '분석 요청에 실패했습니다';
    if (statusError) return '상태 조회에 실패했습니다';
    return data?.result?.progressMessage ?? statusText[status];
  };

  const handleRetry = () => {
    if (analyzeError) {
      startAnalysis();
    } else {
      navigate(0);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-100% w-full gap-15">
      {!isError && <LoadingSpinner />}
      <div className="flex flex-col items-center justify-center gap-6">
        <Stepper status={hasError ? 'FAILED' : status} />
        <h4 className={`bg-clip-text text-transparent ${isError ? 'bg-error' : 'bg-gra2-h'}`}>
          {getMessage()}
        </h4>
        {isError && <Button onClick={handleRetry}>다시 시도</Button>}
      </div>
    </div>
  );
}

const statusText: Record<string, string> = {
  WAITING: '분석 요청 접수중',
  PROCESSING: '매장 데이터 진단중',
  COMPLETED: '분석 완료',
  FAILED: '분석에 실패했습니다',
};
