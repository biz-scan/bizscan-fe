import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowGray from '@/assets/icons/Arrow/gray.svg?react';
import LineIcon from '@/assets/icons/Line/Line.svg?react';
import SimbolLogo from '@/assets/icons/Logo/Simbol.svg?react';
import SwotCard from '@/components/DashboardPage/SwotCard';
import { useGetActionPlans, useGetCatchphrase, useGetSwots } from '@/hooks/analysis/analysisHooks';
import useAuthStore from '@/store/useAuthStore';

const SWOT_TITLES = {
  S: 'Strengths',
  W: 'Weaknesses',
  O: 'Opportunities',
  T: 'Threats',
};

export default function DashboardPage() {
  const navigate = useNavigate();

  const { user, storeId: persistedStoreId } = useAuthStore();

  const storeId = user?.storeId || persistedStoreId;

  const displayName = user?.nickname ?? 'OOOO';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [storeId, navigate]);

  const handleDetailClick = () => {
    navigate('/report');
  };

  const handleSolutionClick = (id: number) => {
    navigate(`/solution/${id}`);
  };

  // SWOT 분석 결과 조회
  const { data: swotResponse } = useGetSwots(storeId as number);
  const swotList = swotResponse?.result || [];

  // AI 캐치프레이즈 조회
  const { data: catchphraseResponse } = useGetCatchphrase(storeId as number);
  const catchphrase = catchphraseResponse?.result?.catchphrase;

  // 실행 전략 목록 조회
  const {
    data: actionPlanResponse,
    isLoading: isActionPlansLoading,
    isError: isActionPlansError,
  } = useGetActionPlans(storeId as number);
  const actionPlans = actionPlanResponse?.result || [];
  const mainSolution = actionPlans[0];

  return (
    <main className="w-full min-h-screen bg-grey-light">
      {/* 상단 히어로 섹션 */}
      <div
        className="w-full bg-no-repeat bg-[center_20%] aspect-[1588/400] bg-cover max-h-[400px] min-h-[250px] flex items-center justify-center"
        style={{ backgroundImage: "url('/images/background.png')" }}
      >
        <div className="flex flex-col items-center">
          <h1 className="text-center text-Grey-Darker text-[clamp(28px,4vw,48px)]">
            반갑습니다, {displayName} 님!
          </h1>
          <div className="mt-[28px] flex px-[24px] py-[12px] justify-center items-center rounded-[8px] bg-gra2-right shadow-md">
            {catchphrase && (
              <span className="text-blue-light text-[clamp(14px,1.2vw,16px)] font-normal whitespace-nowrap">
                {catchphrase}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-[clamp(20px,5vw,48px)]">
        {/* AI SWOT 분석 타이틀 */}
        <div className="mt-[clamp(40px,10vw,120px)] flex justify-between items-center">
          <div className="flex items-center gap-[20px]">
            <SimbolLogo className="w-[42px] h-[42px] aspect-square shrink-0" />
            <h2 className="text-blue-dark text-[clamp(24px,3vw,32px)]">AI SWOT 분석</h2>
          </div>
          <button
            onClick={handleDetailClick}
            className="flex px-[20px] py-[10px] justify-center items-center gap-[10px] border border-grey-normal rounded-[8px] transition-all hover:bg-gray-50 active:scale-95"
          >
            <span className="text-grey-normal typo-p2-semibold whitespace-nowrap">자세히 보기</span>
            <ArrowGray className="w-4 h-4 shrink-0" />
          </button>
        </div>

        {/* SWOT 카드 그리드 */}
        <div className="mt-[48px] grid grid-cols-1 md:grid-cols-2 gap-[20px]">
          {swotList.map((item) => (
            <SwotCard
              key={item.swotId}
              type={item.type}
              title={SWOT_TITLES[item.type]}
              keyword={item.keyword}
              description={item.description}
            />
          ))}
        </div>

        {/* 라인 구분선 */}
        <div className="mt-[clamp(60px,10vw,140px)] flex justify-center w-full overflow-hidden">
          <LineIcon className="w-full h-auto text-transparent" />
        </div>

        {/* AI 추천 핵심 솔루션 타이틀 */}
        <div className="mt-[clamp(60px,10vw,140px)] flex justify-between items-center">
          <div className="flex items-center gap-[20px]">
            <SimbolLogo className="w-[42px] h-[42px] aspect-square shrink-0" />
            <h2 className="text-blue-dark text-[clamp(24px,3vw,32px)]">AI 추천 핵심 솔루션</h2>
          </div>
        </div>

        {/* 핵심 솔루션 */}
        {isActionPlansLoading ? (
          <div className="mt-[clamp(24px,4vw,48px)] w-full max-w-[1348px] mx-auto rounded-[20px] bg-grey-light shadow-normal px-[clamp(20px,5vw,48px)] py-[30px]">
            <p className="text-grey-normal typo-p2-regular">솔루션을 불러오는 중...</p>
          </div>
        ) : isActionPlansError ? (
          <div className="mt-[clamp(24px,4vw,48px)] w-full max-w-[1348px] mx-auto rounded-[20px] bg-grey-light shadow-normal px-[clamp(20px,5vw,48px)] py-[30px]">
            <p className="text-grey-normal typo-p2-regular">
              솔루션을 불러오지 못했어요. 잠시 후 다시 시도해주세요.
            </p>
          </div>
        ) : mainSolution ? (
          <div className="mt-[clamp(24px,4vw,48px)] w-full max-w-[1348px] mx-auto rounded-[20px] bg-grey-light shadow-normal px-[clamp(20px,5vw,48px)] py-[30px] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-col gap-[16px]">
              <p className="text-grey-darker text-[clamp(18px,2vw,24px)] font-semibold">
                {mainSolution.title}
              </p>
              <div className="flex flex-wrap gap-[8px]">
                {(mainSolution.tags ?? []).map((tag) => (
                  <div
                    key={tag.tagId}
                    className="flex px-[10px] py-[4px] justify-center items-center rounded-[4px] bg-blue-light whitespace-nowrap"
                  >
                    <span className="text-blue-dark typo-p2-medium">{tag.content}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleSolutionClick(mainSolution.actionPlanId)}
              className="flex px-[20px] py-[10px] justify-center items-center gap-[10px] border border-grey-normal rounded-[8px] transition-all hover:bg-gray-50 active:scale-95"
            >
              <span className="text-grey-normal typo-p2-semibold whitespace-nowrap">
                자세히 보기
              </span>
              <ArrowGray className="w-4 h-4 shrink-0" />
            </button>
          </div>
        ) : (
          <div className="mt-[clamp(24px,4vw,48px)] w-full max-w-[1348px] mx-auto rounded-[20px] bg-grey-light shadow-normal px-[clamp(20px,5vw,48px)] py-[30px]">
            <p className="text-grey-normal typo-p2-regular">
              아직 생성된 맞춤 솔루션이 없어요. AI 분석이 완료된 후 확인할 수 있습니다.
            </p>
          </div>
        )}

        <div className="h-[clamp(40px,10vw,100px)]" />
      </div>
    </main>
  );
}
