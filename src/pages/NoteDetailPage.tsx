import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CloseIcon from '@/assets/icons/Close/state=Default.svg?react';
import Simbol from '@/assets/icons/Logo/Simbol.svg?react';
import FieldLabel from '@/components/common/FieldLabel';
import HashTag from '@/components/NotesPage/HashTag';
import ProgressBar from '@/components/NotesPage/ProgressBar';
import StepSection from '@/components/NotesPage/StepSection';
import { splitSteps } from '@/components/NotesPage/StepUtils';
import { useActionNoteDetail } from '@/hooks/note/useActionNoteDetail';
import { usePatchActionDetail } from '@/hooks/note/usePatchActionDetail';
import useAuthStore from '@/store/useAuthStore';

export default function NoteDetailPage() {
  const navigate = useNavigate();
  const { noteId } = useParams<{ noteId: string }>();

  const { user } = useAuthStore();
  const nickname = user?.nickname ?? '사용자';

  const storeId = user?.storeId ?? undefined;

  const actionPlanId = noteId ? Number(noteId) : undefined;

  const detailQuery = useActionNoteDetail(actionPlanId);
  const note = detailQuery.data;
  const isLoading = detailQuery.isLoading;
  const isError = detailQuery.isError;
  const error = detailQuery.error;

  const patchMutation = usePatchActionDetail();

  const [expandedStepIds, setExpandedStepIds] = React.useState<Set<number>>(() => new Set());

  React.useEffect(() => {
    setExpandedStepIds(new Set());
  }, [actionPlanId]);

  const computed = React.useMemo(() => {
    const steps = note?.actionDetails ?? [];
    const total = steps.length;
    const done = steps.reduce((acc, s) => (s.isCompleted ? acc + 1 : acc), 0);
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;

    const { completedSteps, inProgressSteps } = splitSteps(steps);
    const safePercent = Math.min(100, Math.max(0, percent));

    return {
      total,
      done,
      percent: safePercent,
      label: `${safePercent}% (${done}/${total})`,
      completedSteps,
      inProgressSteps,
    };
  }, [note]);

  const onToggleExpanded = (actionDetailId: number) => {
    setExpandedStepIds((prev) => {
      const next = new Set(prev);
      if (next.has(actionDetailId)) next.delete(actionDetailId);
      else next.add(actionDetailId);
      return next;
    });
  };

  const onToggleStep = async (actionDetailId: number, next: boolean) => {
    if (storeId == null || actionPlanId == null) return;

    await patchMutation.mutateAsync({
      storeId,
      actionPlanId,
      actionDetailId,
      isCompleted: next,
    });
  };

  return (
    <div className="min-h-screen bg-grey-light px-[120px] py-[120px]">
      <div className="mx-auto w-full max-w-[1100px]">
        <div className="flex items-center gap-[8px]">
          <Simbol className="h-[32px] w-[32px]" />
          <h3 className="text-blue-dark">{nickname}님의 실행 노트</h3>
        </div>

        <div className="mt-[28px] flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h4 className="text-grey-dark-active">
              {isLoading ? '불러오는 중...' : note?.actionPlanTitle ?? '(노트 없음)'}
            </h4>

            <div className="mt-3 flex flex-wrap gap-2">
              {(note?.tags ?? []).map((t) => (
                <HashTag key={t.tagId}>{t.content}</HashTag>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="닫기"
            className="shrink-0 flex items-center justify-center h-[42px] w-[42px] rounded-md hover:bg-grey-light-active"
          >
            <CloseIcon className="h-[42px] w-[42px]" />
          </button>
        </div>

        <div className="mt-[36px] w-full border-b-2 border-blue-light-hover" />

        <div className="mt-[48px] space-y-[48px]">
          {isError ? (
            <div className="rounded-2xl border border-red-200 bg-white px-6 py-8">
              <p className="typo-p2-semibold text-red-500">실행 노트 상세 조회에 실패했습니다.</p>
              <p className="typo-p3-regular mt-2 text-grey-normal">
                {String((error as Error | undefined)?.message ?? error ?? '')}
              </p>
              <p className="typo-p3-regular mt-2 text-grey-normal">
                actionPlanId: {String(actionPlanId)} / storeId: {String(storeId)}
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-[20px]">
                <FieldLabel text="AI 추천 이유" />
                <div className="rounded-[20px] bg-grey-light px-[48px] py-[48px] shadow-normal">
                  <p className="typo-p1-regular whitespace-pre-line leading-7 text-grey-darker">
                    {note?.reason ?? ''}
                  </p>
                </div>
              </div>

              <div className="space-y-[20px]">
                <FieldLabel text="진행률" />
                <div className="flex items-center gap-[20px]">
                  <div className="w-[360px]">
                    <ProgressBar value={computed.percent} />
                  </div>

                  <div className="inline-flex items-center justify-center rounded-[8px] border-[1px] border-blue-light-active bg-blue-light px-[16px] py-[4px]">
                    <span className="typo-p2-semibold text-blue-normal">{computed.label}</span>
                  </div>
                </div>
              </div>

              <StepSection
                title="완료한 세부 목표"
                emptyText="아직 완료한 세부 목표가 없습니다."
                steps={computed.completedSteps}
                variant="completed"
                expandedStepIds={expandedStepIds}
                onToggleExpanded={onToggleExpanded}
                onToggleChecked={onToggleStep}
              />

              <StepSection
                title="진행할 세부 목표"
                emptyText="진행할 세부 목표가 없습니다."
                steps={computed.inProgressSteps}
                variant="inProgress"
                expandedStepIds={expandedStepIds}
                onToggleExpanded={onToggleExpanded}
                onToggleChecked={onToggleStep}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
