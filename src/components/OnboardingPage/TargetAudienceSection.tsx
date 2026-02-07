import FieldLabel from '@/components/common/FieldLabel';
import FormRow from '@/components/SettingsPage/FormRow';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/ToggleGroup';

const TOGGLE_ITEM_CLASS = 'h-[60px] px-[28px] py-[16px] rounded-[8px] whitespace-nowrap';

const AGE_OPTIONS = ['20대', '3040 직장인', '가족 단위', '동네 주민', '관광객'];

interface TargetAudienceSectionProps {
  targetCustomers: string;
  onTargetCustomersChange: (value: string) => void;
}

export default function TargetAudienceSection({
  targetCustomers,
  onTargetCustomersChange,
}: TargetAudienceSectionProps) {
  return (
    <section>
      <FormRow label={<FieldLabel text="주 타겟 고객" />}>
        <div className="flex w-full flex-col gap-[20px]">
          <p className="whitespace-nowrap typo-lead-semibold text-grey-darker">
            주로 어떤 손님이 오시나요? (또는 오길 바라나요?)
          </p>

          <ToggleGroup
            type="single"
            value={targetCustomers}
            onValueChange={(v) => v && onTargetCustomersChange(v)}
            className="flex flex-wrap gap-[12px]"
          >
            {AGE_OPTIONS.map((a) => (
              <ToggleGroupItem key={a} value={a} className={TOGGLE_ITEM_CLASS}>
                {a}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </FormRow>
    </section>
  );
}
