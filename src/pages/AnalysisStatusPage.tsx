import Stepper from '@/components/AnalysisStatusPage/Stepper';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export function AnalysisStatusPage() {
  return (
    <div className="flex flex-col items-center justify-center h-100% w-full gap-15">
      <LoadingSpinner />
      <div className="flex flex-col items-center justify-center gap-6">
        <Stepper status="PROCESSING" />
        <h4 className="bg-gra2-h bg-clip-text text-transparent">매장 데이터 진단중</h4>
      </div>
    </div>
  );
}
