import FieldLabel from '@/components/common/FieldLabel';
import FormRow from '@/components/SettingsPage/FormRow';
import { Label } from '@/components/ui/Label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';

const PAIN_OPTIONS = [
  '신규 손님이 너무 안 와요 (모객)',
  '한 번 온 손님이 재방문을 안 해요 (단골 관리)',
  '주변에 경쟁 가게가 너무 많이 생겼어요 ( 경쟁 우위)',
  '매출은 좋은데 남는 게 없어요 (수익성 개선)',
  '메뉴/가격을 어떻게 정할지 모르겠어요 (상품 기획)',
];

interface PainPointSectionProps {
  painPoint: string;
  onPainPointChange: (value: string) => void;
}

export default function PainPointSection({ painPoint, onPainPointChange }: PainPointSectionProps) {
  return (
    <section>
      <FormRow label={<FieldLabel text="사장님의 현재 고민" />}>
        <div className="flex w-full flex-col gap-[20px]">
          <p className="typo-lead-semibold text-grey-darker">
            지금 가장 해결하고 싶은 문제는 무엇인가요? (하나만 선택)
          </p>

          <RadioGroup value={painPoint} onValueChange={onPainPointChange} className="gap-[16px]">
            {PAIN_OPTIONS.map((opt) => {
              const id = `pain-${opt}`;
              return (
                <div key={opt} className="flex items-start gap-[12px]">
                  <RadioGroupItem id={id} value={opt} />
                  <Label htmlFor={id} className="typo-p1-semibold text-grey-dark">
                    {opt}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      </FormRow>
    </section>
  );
}
