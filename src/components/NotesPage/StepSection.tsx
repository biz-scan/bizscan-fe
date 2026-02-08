import FieldLabel from '@/components/common/FieldLabel';
import type { ActionNoteDetailItem } from '@/types/note.type';

import StepRow from './StepItem';

type StepSectionProps = {
  title: string;
  emptyText: string;
  steps: ActionNoteDetailItem[];
  variant: 'completed' | 'inProgress';
  expandedStepIds: Set<number>;
  onToggleExpanded: (actionDetailId: number) => void;
  onToggleChecked: (actionDetailId: number, next: boolean) => void;
};

export default function StepSection({
  title,
  emptyText,
  steps,
  variant,
  expandedStepIds,
  onToggleExpanded,
  onToggleChecked,
}: StepSectionProps) {
  return (
    <div className="space-y-[20px]">
      <FieldLabel text={title} />
      <div className="space-y-[20px]">
        {steps.length === 0 ? (
          <div className="rounded-[16px] bg-white px-[24px] py-[18px] shadow-normal">
            <p className="typo-p3-regular text-grey-normal">{emptyText}</p>
          </div>
        ) : (
          steps.map((s) => (
            <StepRow
              key={s.actionDetailId}
              step={s}
              variant={variant}
              expanded={expandedStepIds.has(s.actionDetailId)}
              onToggleExpanded={() => onToggleExpanded(s.actionDetailId)}
              onToggleChecked={(next) => onToggleChecked(s.actionDetailId, next)}
            />
          ))
        )}
      </div>
    </div>
  );
}
