import DownIcon from '@/assets/icons/Arrow/down.svg?react';
import UpIcon from '@/assets/icons/Arrow/up.svg?react';
import { Checkbox } from '@/components/ui/Checkbox';
import type { ActionNoteDetailItemDTO } from '@/types/note.type';

type StepRowProps = {
  step: ActionNoteDetailItemDTO;
  expanded: boolean;
  onToggleExpanded: () => void;
  onToggleChecked: (next: boolean) => void;
  variant: 'completed' | 'inProgress';
};

export default function StepRow({
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

            <p className="typo-p2-medium leading-6 text-blue-normal">{step.expectedOutcome}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
