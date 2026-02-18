import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowGray from '@/assets/icons/Arrow/gray.svg?react';
import LineIcon from '@/assets/icons/Line/Line.svg?react';
import SimbolLogo from '@/assets/icons/Logo/Simbol.svg?react';
import ClickIcon from '@/assets/icons/Dashboard/click.svg?react';
import LineDotIcon from '@/assets/icons/Dashboard/line_dot.svg?react';
import DashboardIcon1 from '@/assets/icons/Dashboard/dashboard_1.svg?react';
import DashboardIcon2 from '@/assets/icons/Dashboard/dashboard_2.svg?react';
import DashboardIcon3 from '@/assets/icons/Dashboard/dashboard_3.svg?react';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import SwotCard from '@/components/DashboardPage/SwotCard';
import { Button } from '@/components/ui/Button';
import { useAppQuery } from '@/apis/apiHooks';
import { getSimilarStores } from '@/apis/analysis/analysis';
import { useActionPlans, useCatchphrase, useSwots } from '@/hooks/analysis';
import useAuthStore from '@/store/useAuthStore';
import type { GetSimilarStoresResponse } from '@/types/analysis.type';

const SWOT_TITLES = {
  S: 'Strengths',
  W: 'Weaknesses',
  O: 'Opportunities',
  T: 'Threats',
};

const DASHBOARD_ICONS = [DashboardIcon1, DashboardIcon2, DashboardIcon3];

export default function DashboardPage() {
  const navigate = useNavigate();

  const { user } = useAuthStore();

  const storeId = user?.storeId;

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

  const handleSwotClick = (type: string) => {
    navigate(`/report?type=${type}`);
  };

  // SWOT 분석 결과 조회
  const { data: swotResponse, isLoading: isSwotLoading } = useSwots(storeId as number);
  const swotList = swotResponse?.result || [];

  // AI 캐치프레이즈 조회
  const { data: catchphraseResponse } = useCatchphrase(storeId as number);
  const catchphrase = catchphraseResponse?.result?.catchphrase;

  // 실행 전략 목록 조회
  const {
    data: actionPlanResponse,
    isLoading: isActionPlansLoading,
    isError: isActionPlansError,
  } = useActionPlans(storeId as number);
  const actionPlans = actionPlanResponse?.result || [];
  const mainSolution = actionPlans[0];

  const { data: similarStoresResponse, isLoading: isSimilarLoading } =
    useAppQuery<GetSimilarStoresResponse>(
      ['similarStores', storeId],
      () => getSimilarStores(storeId as number),
      { enabled: !!storeId }
    );
  const similarStores = similarStoresResponse?.result || [];

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
          <Button variant="outline" size="sm" onClick={handleDetailClick} className="gap-[10px]">
            자세히 보기
            <ArrowGray className="w-4 h-4 shrink-0" />
          </Button>
        </div>

        {/* SWOT 카드 그리드 */}
        {isSwotLoading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="mt-[48px] grid grid-cols-1 md:grid-cols-2 gap-[20px]">
            {swotList.map((item) => (
              <SwotCard
                key={item.swotId}
                type={item.type}
                title={SWOT_TITLES[item.type]}
                keyword={item.keyword}
                description={item.description}
                onClick={() => handleSwotClick(item.type)}
              />
            ))}
          </div>
        )}

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
          <div className="mt-[clamp(24px,4vw,48px)] w-full max-w-[1348px] mx-auto rounded-[20px] bg-grey-light shadow-normal px-[clamp(20px,5vw,48px)] py-[30px] flex justify-center">
            <LoadingSpinner />
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

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSolutionClick(mainSolution.actionPlanId)}
              className="gap-[10px]"
            >
              자세히 보기
              <ArrowGray className="w-4 h-4 shrink-0" />
            </Button>
          </div>
        ) : (
          <div className="mt-[clamp(24px,4vw,48px)] w-full max-w-[1348px] mx-auto rounded-[20px] bg-grey-light shadow-normal px-[clamp(20px,5vw,48px)] py-[30px]">
            <p className="text-grey-normal typo-p2-regular">
              아직 생성된 맞춤 솔루션이 없어요. AI 분석이 완료된 후 확인할 수 있습니다.
            </p>
          </div>
        )}

        {/* 추가 기능/*/}
        <div className="mt-[clamp(60px,10vw,140px)] flex justify-center w-full overflow-hidden">
          <LineIcon className="w-full h-auto text-transparent" />
        </div>

        <div className="mt-[clamp(60px,10vw,140px)] flex flex-col items-center w-full">
          <div className="flex justify-center items-start gap-[10px] p-[12px] rounded-[12px] bg-grey-light shadow-normal">
            <ClickIcon className="w-[40px] h-[40px]" />
          </div>

          <h3 className="mt-[24px] text-center text-h3 text-grey-darker">
            나와 <span className="text-blue-dark">비슷한 AI 분석 결과</span>를 가진 가게들이에요!
          </h3>

          {isSimilarLoading ? (
            <div className="mt-[64px] flex h-64 w-full items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : similarStores.length > 0 ? (
            <div className="mt-[64px] grid grid-cols-1 lg:grid-cols-3 gap-[20px]">
              {similarStores.map((store, index) => {
                const IconComponent = DASHBOARD_ICONS[index % DASHBOARD_ICONS.length];
                return (
                  <div
                    key={store.storeId}
                    className="
                      relative flex h-auto w-full max-w-[440px]
                      flex-col items-center rounded-[20px] border
                      border-blue-light-active bg-grey-light px-[30px] py-[35px]
                    "
                  >
                    <div className="absolute top-[-1px] left-[-1px] z-10">
                      <div className="flex h-[80px] w-[80px] items-center justify-center rounded-br-[20px] rounded-tl-[20px] bg-blue-light-active text-[40px] text-white">
                        {store.rank}
                      </div>
                    </div>

                    <div className="mt-[37.5px] flex h-[120px] w-[120px] items-center justify-center gap-[14px] rounded-[20px] bg-grey-light p-[28px_31px] shadow-normal">
                      <IconComponent className="h-full w-full" />
                    </div>

                    <h4 className="mt-[28px] text-center text-h4 text-grey-darker">
                      {store.storeTitle}
                    </h4>

                    <div className="mt-[12px] flex items-center justify-center">
                      <span className="bg-gra2-right bg-clip-text text-center text-transparent typo-p2-semibold">
                        AI 분석 유사도
                      </span>
                      <div className="ml-[12px] flex items-center justify-center gap-[10px] rounded-[20px] border border-blue-normal px-[12px] py-[4px]">
                        <span className="bg-gra2-right bg-clip-text text-center text-transparent typo-p2-semibold">
                          {store.similarityPercent}%
                        </span>
                      </div>
                    </div>

                    <div className="mt-[28px] flex w-full flex-wrap items-center justify-center gap-[8px]">
                      {store.hashTags.map((tag, tagIndex) => (
                        <div
                          key={tagIndex}
                          className="rounded-[4px] bg-blue-light px-[10px] py-[4px]"
                        >
                          <span className="block text-center text-blue-dark typo-p2-medium">
                            {tag}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-[28px] flex w-full justify-center overflow-hidden">
                      <LineDotIcon className="h-auto w-full" />
                    </div>

                    <div className="mx-auto mt-[28px] flex min-h-[48px] w-full max-w-[221px] items-center justify-center gap-[10px] rounded-[8px] bg-gra2-right px-[24px] py-[10px]">
                      <span className="whitespace-nowrap text-center text-blue-light typo-p1-bold">
                        {store.catchphrase}
                      </span>
                    </div>

                    <p className="mt-[16px] text-center text-grey-dark typo-p2-medium">
                      {store.actionPlanSummary}
                    </p>

                    <Button
                      variant="outline"
                      className="mx-auto mt-[34px] h-[44px] w-full max-w-[252px] gap-[4px] border-grey-normal bg-grey-light text-grey-dark"
                      onClick={() =>
                        navigate(`/report?storeId=${store.storeId}`, {
                          state: { storeTitle: store.storeTitle },
                        })
                      }
                    >
                      이 가게의 AI 분석 리포트 보기
                      <ArrowGray className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-[64px] flex h-64 w-full items-center justify-center rounded-lg border-2 border-dashed border-grey-normal/20 bg-white/50">
              <p className="text-grey-normal typo-p1-medium">
                비슷한 가게 추천을 불러올 수 없습니다.
              </p>
            </div>
          )}
        </div>

        <div className="h-[clamp(40px,10vw,100px)]" />
      </div>
    </main>
  );
}
