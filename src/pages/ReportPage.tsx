import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  useGetActionPlans,
  useGetSwotDiagnosis,
  useGetSwots,
} from '@/hooks/analysis/analysisHooks';
import SwotCard from '@/components/DashboardPage/SwotCard';
import SimbolLogo from '@/assets/icons/Logo/Simbol.svg?react';
import LineIcon from '@/assets/icons/Line/Line.svg?react';
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
  const { data: swotResponse } = useGetSwots(storeId as number);
  const swotList = swotResponse?.result || [];

  const selectedSwot = swotList.find((item) => item.type === selectedType);
  const swotId = selectedSwot?.swotId;

  const { data: diagnosisResponse } = useGetSwotDiagnosis(swotId as number);
  const diagnosis = diagnosisResponse?.result?.diagnosis;

  // 실행 전략 목록 조회
  const { data: actionPlanResponse } = useGetActionPlans(storeId as number);
  const actionPlans = actionPlanResponse?.result || [];

  return (
    <main className="w-full min-h-screen bg-grey-light">
      <div className="mx-auto w-full max-w-[1348px] pt-[120px] px-6 md:px-10 xl:px-[60px]">
        <div className="flex items-center gap-[20px] mb-[48px]">
          <SimbolLogo className="w-[42px] h-[42px]" />
          <h2 className="text-blue-dark text-[32px]">AI SWOT 분석</h2>
        </div>

        {/* SWOT 카드 */}
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

        {/* AI 정밀 진단 */}
        {selectedType && diagnosis && (
          <>
            <div className="mt-[clamp(60px,8vw,145px)] flex justify-center w-full overflow-hidden">
              <LineIcon className="w-full h-auto text-transparent" />
            </div>

            <section className="mt-[clamp(60px,8vw,145px)] animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="flex items-center gap-[20px] mb-[clamp(24px,3vw,48px)]">
                <SimbolLogo className="w-[42px] h-[42px]" />
                <h2 className="text-blue-dark text-[clamp(24px,3vw,32px)]">AI 정밀 진단</h2>
              </div>

              <div className="w-full max-w-[1348px] min-h-[200px] aspect-[1348/360] rounded-[20px] bg-grey-light shadow-normal flex flex-col items-start p-[clamp(24px,3vw,48px)]">
                <p className="text-grey-darker typo-p1-regular">{diagnosis}</p>
              </div>
            </section>

            <div className="mt-[clamp(60px,8vw,145px)] flex justify-center w-full overflow-hidden animate-in fade-in duration-700">
              <LineIcon className="w-full h-auto text-transparent" />
            </div>

            {/* 맞춤 실행 전략 */}
            <section className="mt-[clamp(60px,8vw,145px)]">
              <div className="flex items-center gap-[20px] mb-[clamp(24px,3vw,48px)]">
                <SimbolLogo className="w-[42px] h-[42px]" />
                <h2 className="text-blue-dark text-[clamp(24px,3vw,32px)]">맞춤 실행 전략</h2>
              </div>

              <div className="flex flex-col">
                {actionPlans.map((item) => (
                  <SolutionCard
                    key={item.actionPlanId}
                    id={String(item.actionPlanId)}
                    title={item.title}
                    tags={item.tags.map((t) => t.content)}
                  />
                ))}
              </div>
            </section>

            <div className="h-[clamp(100px,15vw,241px)]" />
          </>
        )}
      </div>
    </main>
  );
}
