import * as React from 'react';
import { useMemo, useSyncExternalStore } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CloseIcon from '@/assets/icons/Close/state=Default.svg?react';
import DownIcon from '@/assets/icons/Arrow/down.svg?react';
import UpIcon from '@/assets/icons/Arrow/up.svg?react';
import Simbol from '@/assets/icons/Logo/Simbol.svg?react';
import FieldLabel from '@/components/common/FieldLabel';
import HashTag from '@/components/NotesPage/HashTag';
import ProgressBar from '@/components/NotesPage/ProgressBar';
import { Checkbox } from '@/components/ui/Checkbox';
import useAuthStore from '@/store/useAuthStore';
import {
  calcProgress,
  getNote,
  type NoteStep,
  subscribeNotes,
  updateNoteSteps,
} from '@/mocks/notesMockStore';

function splitSteps(steps: NoteStep[]) {
  return {
    completedSteps: steps.filter((s) => s.isCompleted),
    inProgressSteps: steps.filter((s) => !s.isCompleted),
  };
}

type StepRowProps = {
  step: NoteStep;
  expanded: boolean;
  onToggleExpanded: () => void;
  onToggleChecked: (next: boolean) => void;
  variant: 'completed' | 'inProgress';
};

function StepRow({
  step,
  expanded,
  onToggleExpanded,
  onToggleChecked,
  variant,
}: StepRowProps) {
  const containerClass =
    variant === 'completed'
      ? 'border-blue-light-active bg-blue-light'
      : 'border-blue-normal bg-grey-light';

  return (
    <div className={`rounded-[20px] border-[1px] shadow-normal ${containerClass}`}>
      <div className="flex items-center gap-[32px] px-[48px] py-[24px]">
        <Checkbox
          checked={step.isCompleted}
          onCheckedChange={(v: unknown) => onToggleChecked(Boolean(v))}
          className={variant === 'inProgress' ? 'bg-grey-light-active' : undefined}
        />

        <div className="min-w-0 flex-1">
          <p className="typo-p1-semibold text-grey-darker">{step.title}</p>
        </div>

        <button
          type="button"
          onClick={onToggleExpanded}
          aria-label={expanded ? '접기' : '펼치기'}
          className="shrink-0 inline-flex h-[36px] w-[36px] items-center justify-center rounded-[10px]"
        >
          {expanded ? (
            <UpIcon className="h-[20px] w-[20px]" />
          ) : (
            <DownIcon className="h-[20px] w-[20px]" />
          )}
        </button>
      </div>

      {expanded ? (
        <div className="px-[48px] pt-0 pb-[20px]">
          <p className="typo-p2-semibold whitespace-pre-line leading-7 text-grey-dark">
            {step.description}
          </p>

          <div className="mt-[20px] flex items-center gap-[12px]">
            <span className="inline-flex shrink-0 items-center rounded-[8px] border-[1px] border-blue-normal px-[12px] py-[4px] typo-p2-medium text-blue-normal">
              기대효과
            </span>

            <p className="typo-p2-medium leading-6 text-blue-normal">
              {step.expectedOutcome}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function NoteDetailPage() {
  const navigate = useNavigate();
  const { noteId } = useParams<{ noteId: string }>();

  const { user } = useAuthStore();
  const nickname = user?.nickname ?? '사용자';

  const note = useSyncExternalStore(
    subscribeNotes,
    () => (noteId ? getNote(noteId) : null),
    () => (noteId ? getNote(noteId) : null)
  );

  const [expandedStepIds, setExpandedStepIds] = React.useState<Set<string>>(
    () => new Set()
  );

  React.useEffect(() => {
    setExpandedStepIds(new Set());
  }, [noteId]);

  const computed = useMemo(() => {
    const steps = note?.steps ?? [];
    const { total, done, percent: rawPercent } = calcProgress(steps);
    const { completedSteps, inProgressSteps } = splitSteps(steps);

    const percent = Math.min(100, Math.max(0, rawPercent));

    return {
      total,
      done,
      percent,
      label: `${percent}% (${done}/${total})`,
      completedSteps,
      inProgressSteps,
    };
  }, [note?.steps]);

  const onToggleStep = (stepId: string, next: boolean) => {
    if (!note) return;

    const nextSteps = note.steps.map((s) =>
      s.id === stepId ? { ...s, isCompleted: next } : s
    );
    updateNoteSteps(note.noteId, nextSteps);
  };

  const onToggleExpanded = (stepId: string) => {
    setExpandedStepIds((prev) => {
      const next = new Set(prev);
      if (next.has(stepId)) next.delete(stepId);
      else next.add(stepId);
      return next;
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
            <h4 className="text-grey-dark-active">{note?.title ?? '(노트 없음)'}</h4>

            <div className="mt-3 flex flex-wrap gap-2">
              {(note?.tags ?? []).map((t) => (
                <HashTag key={t.id}>#{t.name}</HashTag>
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
          {/* AI 추천 이유 */}
          <div className="space-y-[20px]">
            <FieldLabel text="AI 추천 이유" />
            <div className="rounded-[20px] bg-grey-light px-[48px] py-[48px] shadow-normal">
              <p className="typo-p1-regular whitespace-pre-line leading-7 text-grey-darker">
                {note?.aiReason ?? ''}
              </p>
            </div>
          </div>

          {/* 진행률 */}
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

          {/* 완료한 세부 목표 */}
          <div className="space-y-[20px]">
            <FieldLabel text="완료한 세부 목표" />

            <div className="space-y-[20px]">
              {computed.completedSteps.length === 0 ? (
                <div className="rounded-[16px] bg-white px-[24px] py-[18px] shadow-normal">
                  <p className="typo-p3-regular text-grey-normal">
                    아직 완료한 세부 목표가 없습니다.
                  </p>
                </div>
              ) : (
                computed.completedSteps.map((s) => (
                  <StepRow
                    key={s.id}
                    step={s}
                    variant="completed"
                    expanded={expandedStepIds.has(s.id)}
                    onToggleExpanded={() => onToggleExpanded(s.id)}
                    onToggleChecked={(next) => onToggleStep(s.id, next)}
                  />
                ))
              )}
            </div>
          </div>

          {/* 진행할 세부 목표 */}
          <div className="space-y-[20px]">
            <FieldLabel text="진행할 세부 목표" />

            <div className="space-y-[20px]">
              {computed.inProgressSteps.length === 0 ? (
                <div className="rounded-[16px] bg-white px-[24px] py-[18px] shadow-normal">
                  <p className="typo-p3-regular text-grey-normal">
                    진행할 세부 목표가 없습니다.
                  </p>
                </div>
              ) : (
                computed.inProgressSteps.map((s) => (
                  <StepRow
                    key={s.id}
                    step={s}
                    variant="inProgress"
                    expanded={expandedStepIds.has(s.id)}
                    onToggleExpanded={() => onToggleExpanded(s.id)}
                    onToggleChecked={(next) => onToggleStep(s.id, next)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
