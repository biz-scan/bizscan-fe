import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import ArrowWhite from '@/assets/icons/Arrow/white.svg?react';
import CloseActive from '@/assets/icons/Close/state=active.svg?react';
import CloseHover from '@/assets/icons/Close/state=hover.svg?react';
import CheckIcon from '@/assets/icons/Icon/type=check.svg?react';
import LineIcon from '@/assets/icons/Line/Line.svg?react';
import SimbolLogo from '@/assets/icons/Logo/Simbol.svg?react';
import FieldLabel from '@/components/common/FieldLabel';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Button } from '@/components/ui/Button';
import { useGetActionPlanDetail } from '@/hooks/analysis/analysisHooks';
import { usePostActionNote } from '@/hooks/note/useNoteHooks';

export default function SolutionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const actionPlanId = id ? Number(id) : NaN;

  const { data: actionPlanDetailResponse, isLoading } = useGetActionPlanDetail(actionPlanId);

  const { mutate: addToNote, isPending: isAdding } = usePostActionNote();

  const actionPlan = actionPlanDetailResponse?.result;

  const handleAddToNote = () => {
    if (isNaN(actionPlanId)) {
      toast.error('유효하지 않은 실행 전략입니다.');
      return;
    }
    addToNote(actionPlanId, {
      onSuccess: () => {
        navigate('/notes');
      },
    });
  };

  return (
    <main className="w-full min-h-screen bg-grey-light pb-[100px]">
      <div className="mx-auto w-full max-w-[1348px] pt-[120px] px-6 md:px-10 xl:px-[60px]">
        {/* 맞춤 실행 전략 헤더 */}
        <div className="flex justify-between items-start mb-[clamp(32px,4vw,48px)]">
          <div className="flex items-center gap-[20px]">
            <SimbolLogo className="w-[42px] h-[42px]" />
            <h2 className="text-blue-dark text-[clamp(24px,3vw,32px)]">맞춤 실행 전략</h2>
          </div>

          <button
            onClick={() => navigate(-1)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="cursor-pointer transition-transform active:scale-95"
          >
            {isHovered ? (
              <CloseHover className="w-[32px] h-[32px]" />
            ) : (
              <CloseActive className="w-[32px] h-[32px]" />
            )}
          </button>
        </div>

        <section className="flex flex-col">
          <h1 className="text-grey-darker text-[clamp(20px,2.5vw,32px)]">
            {actionPlan?.actionPlanTitle ??
              (isLoading
                ? '실행 전략을 불러오는 중입니다...'
                : '실행 전략 정보를 불러올 수 없어요.')}
          </h1>

          {actionPlan && actionPlan.tags?.length > 0 && (
            <div className="flex flex-wrap gap-[8px] mt-[20px]">
              {actionPlan.tags.map((tag) => (
                <div
                  key={tag.tagId}
                  className="flex px-[10px] py-[4px] justify-center items-center gap-[2px] rounded-[4px] bg-blue-light whitespace-nowrap"
                >
                  <span className="text-blue-dark typo-p2-medium">{tag.content}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="mt-[26px] flex justify-center w-full overflow-hidden">
          <LineIcon className="w-full h-auto text-transparent" />
        </div>

        {/* AI 추천 이유 */}
        <section className="flex flex-col items-start">
          <div className="mt-[60px] mb-[20px]">
            <FieldLabel text="AI 추천 이유" />
          </div>

          <div className="w-full max-w-[1348px] min-h-[200px] aspect-auto md:aspect-[1348/360] rounded-[20px] bg-grey-light shadow-normal flex flex-col p-[clamp(24px,3vw,48px)]">
            {isLoading ? (
              <div className="flex-1 flex items-center justify-center w-full h-full">
                <LoadingSpinner />
              </div>
            ) : (
              <p className="text-grey-darker typo-p1-regular whitespace-pre-wrap items-start">
                {actionPlan?.reason ?? '추천 이유 정보를 불러올 수 없어요.'}
              </p>
            )}
          </div>
        </section>

        {/* 세부 실행 가이드 */}
        <section className="mt-[60px] w-full flex flex-col">
          <div className="mb-[20px]">
            <FieldLabel text="세부 실행 가이드" />
          </div>

          <div className="flex flex-col gap-[20px] w-full">
            {isLoading ? (
              <div className="w-full min-h-[110px] py-[20px] px-[clamp(24px,5vw,48px)] rounded-[20px] border border-blue-normal bg-grey-light shadow-normal flex items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : actionPlan?.actionDetails?.length === 0 ? (
              <div className="w-full min-h-[110px] py-[20px] px-[clamp(24px,5vw,48px)] rounded-[20px] border border-blue-normal bg-grey-light shadow-normal flex items-center">
                <span className="text-grey-darker typo-p1-semibold">
                  등록된 세부 실행 가이드가 없습니다.
                </span>
              </div>
            ) : (
              actionPlan?.actionDetails?.map((detail) => (
                <div
                  key={detail.actionDetailId}
                  className="flex items-center w-full py-[20px] px-[clamp(24px,5vw,48px)] rounded-[20px] border border-blue-normal bg-grey-light shadow-normal transition-all gap-[24px]"
                >
                  <CheckIcon className="w-[54px] h-[54px] flex-shrink-0" />

                  <div className="flex flex-col gap-[8px]">
                    <span className="text-blue-dark typo-p2-semibold">
                      STEP {detail.step}. {detail.title}
                    </span>
                    <span className="text-grey-darker typo-p1-regular whitespace-pre-wrap">
                      {detail.description}
                    </span>
                    {detail.expectedOutcome && (
                      <span className="text-grey-normal typo-p2-regular whitespace-pre-wrap">
                        기대 효과: {detail.expectedOutcome}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <Button
            variant="default"
            size="lg"
            className="mt-[52px] self-end flex items-center gap-[44px]"
            onClick={handleAddToNote}
            disabled={isAdding || isLoading}
          >
            <span className="typo-p1-bold">{isAdding ? '담는 중...' : '내 실행 노트에 담기'}</span>
            <ArrowWhite className="w-[24px] h-[24px] flex-shrink-0" />
          </Button>
        </section>

        <div className="h-[clamp(100px,15vw,241px)]" />
      </div>
    </main>
  );
}
