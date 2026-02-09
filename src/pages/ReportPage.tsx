import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import LineIcon from '@/assets/icons/Line/Line.svg?react';
import SimbolLogo from '@/assets/icons/Logo/Simbol.svg?react';
import SwotCard from '@/components/DashboardPage/SwotCard';
import SolutionCard from '@/components/ReportPage/SolutionCard';
import {
  useGetActionPlans,
  useGetSwotDiagnosis,
  useGetSwots,
} from '@/hooks/analysis/analysisHooks';
import SwotCard from '@/components/DashboardPage/SwotCard';
import SimbolLogo from '@/assets/icons/Logo/Simbol.svg?react';
import LineIcon from '@/assets/icons/Line/Line.svg?react';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import SolutionCard from '@/components/ReportPage/SolutionCard';
import useAuthStore from '@/store/useAuthStore';

const SWOT_TITLES = {
  S: 'Strengths',
  W: 'Weaknesses',
  O: 'Opportunities',
  T: 'Threats',
};

export default function ReportPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { user, storeId: persistedStoreId } = useAuthStore();
  const storeId = user?.storeId || persistedStoreId;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const selectedType = searchParams.get('type') as 'S' | 'W' | 'O' | 'T' | null;

  const handleCardClick = (type: 'S' | 'W' | 'O' | 'T') => {
    setSearchParams({ type });
  };

  // SWOT 목록 조회
  const { data: swotResponse, isLoading: isSwotLoading } = useGetSwots(storeId as number);
  const swotList = swotResponse?.result || [];

  const selectedSwot = swotList.find((item) => item.type === selectedType);
  const swotId = selectedSwot?.swotId ?? 0;

  const { data: diagnosisResponse, isLoading: isDiagnosisLoading } = useGetSwotDiagnosis(
    swotId as number
  );
  const diagnosis = diagnosisResponse?.result?.diagnosis;

  // 실행 전략 목록 조회
  const { data: actionPlanResponse, isLoading: isActionPlansLoading } = useGetActionPlans(
    storeId as number,
    selectedType || undefined
  );
  const actionPlans = actionPlanResponse?.result || [];

  if (isSwotLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-grey-light">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen bg-grey-light">
      <div className="mx-auto w-full max-w-[1348px] pt-[120px] px-6 md:px-10 xl:px-[60px]">
        <div className="flex items-center gap-[20px] mb-[48px]">
          <SimbolLogo className="w-[42px] h-[42px]" />
          <h2 className="text-blue-dark text-[32px]">AI SWOT 분석</h2>
        </div>

        {/* SWOT 카드 리스트 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[20px] gap-y-[20px]">
          {swotList.map((item) => (
            <SwotCard
              key={item.swotId}
              type={item.type}
              title={SWOT_TITLES[item.type]}
              keyword={item.keyword}
              description={item.description}
              isActive={selectedType === item.type}
              onClick={() => handleCardClick(item.type)}
            />
          ))}
        </div>

        {/* 상세 분석 섹션 (카드가 선택되었을 때만 노출) */}
        {selectedType && (
          <>
            <div className="mt-[clamp(60px,8vw,145px)] flex justify-center w-full overflow-hidden">
              <LineIcon className="w-full h-auto text-transparent" />
            </div>

            {/* AI 정밀 진단 */}
            <section className="mt-[clamp(60px,8vw,145px)] animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="flex items-center gap-[20px] mb-[clamp(24px,3vw,48px)]">
                <SimbolLogo className="w-[42px] h-[42px]" />
                <h2 className="text-blue-dark text-[clamp(24px,3vw,32px)]">AI 정밀 진단</h2>
              </div>

              {isDiagnosisLoading ? (
                <div className="flex justify-center py-20">
                  <LoadingSpinner />
                </div>
              ) : diagnosis ? (
                <div className="w-full max-w-[1348px] min-h-[200px] aspect-[1348/360] rounded-[20px] bg-grey-light shadow-normal flex flex-col items-start p-[clamp(24px,3vw,48px)]">
                  <p className="text-grey-darker typo-p1-regular">{diagnosis}</p>
                </div>
              ) : (
                <div className="w-full max-w-[1348px] min-h-[200px] aspect-[1348/360] rounded-[20px] bg-grey-light shadow-normal flex flex-col items-center justify-center p-[clamp(24px,3vw,48px)]">
                  <p className="text-grey-normal typo-p1-regular">
                    진단 내용을 불러올 수 없습니다.
                  </p>
                </div>
              )}
            </section>

            <div className="mt-[clamp(60px,8vw,145px)] flex justify-center w-full overflow-hidden">
              <LineIcon className="w-full h-auto text-transparent" />
            </div>

            {/* 맞춤 실행 전략 섹션 */}
            <section className="mt-[clamp(60px,8vw,145px)]">
              <div className="flex items-center gap-[20px] mb-[clamp(24px,3vw,48px)]">
                <SimbolLogo className="w-[42px] h-[42px]" />
                <h2 className="text-blue-dark text-[clamp(24px,3vw,32px)]">맞춤 실행 전략</h2>
              </div>

              {isActionPlansLoading ? (
                <div className="flex justify-center py-20">
                  <LoadingSpinner />
                </div>
              ) : actionPlans.length > 0 ? (
                /* 데이터가 있을 때 */
                <div className="flex flex-col animate-in fade-in duration-500">
                  {actionPlans.map((item) => (
                    <SolutionCard
                      key={item.actionPlanId}
                      id={String(item.actionPlanId)}
                      title={item.title}
                      tags={item.tags.map((t) => t.content)}
                    />
                  ))}
                </div>
              ) : (
                /* 데이터 없을 때 */
                <div className="w-full py-[80px] rounded-[20px] bg-white/50 border-2 border-dashed border-grey-normal/20 flex flex-col items-center justify-center animate-in fade-in duration-500">
                  <SimbolLogo className="w-12 h-12 mb-4 opacity-20 grayscale" />
                  <p className="text-grey-normal typo-p1-medium text-center">
                    {selectedType
                      ? `${SWOT_TITLES[selectedType]} 관련 맞춤 실행 전략이 없습니다.`
                      : '진행된 분석이 없어 전략을 불러올 수 없습니다.'}
                  </p>
                  <p className="text-grey-normal/60 typo-p2-regular mt-2">
                    분석을 다시 진행하거나 다른 항목을 선택해 주세요.
                  </p>
                </div>
              )}
            </section>

            <div className="h-[clamp(100px,15vw,241px)]" />
          </>
        )}
      </div>
    </main>
  );
}
