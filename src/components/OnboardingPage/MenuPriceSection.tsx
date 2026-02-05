import FieldLabel from '@/components/common/FieldLabel';
import FormRow from '@/components/SettingsPage/FormRow';
import { Input } from '@/components/ui/Input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/ToggleGroup';

const TOGGLE_ITEM_CLASS = 'h-[60px] px-[28px] py-[16px] rounded-[8px] whitespace-nowrap';

const PRICE_OPTIONS = ['1만원 미만', '1~2만원대', '2~4만원대', '4만원 이상'];

interface MenuPriceSectionProps {
  menuName: string;
  onMenuNameChange: (value: string) => void;
  avgPrice: string;
  onAvgPriceChange: (value: string) => void;
}

export default function MenuPriceSection({
  menuName,
  onMenuNameChange,
  avgPrice,
  onAvgPriceChange,
}: MenuPriceSectionProps) {
  return (
    <section>
      <FormRow label={<FieldLabel text="시그니처 메뉴와 객단가" />}>
        <div className="flex w-full flex-col gap-[24px]">
          <div className="flex items-center gap-x-[44px]">
            <p className="min-w-[158px] whitespace-nowrap typo-lead-semibold text-grey-darker">
              대표 메뉴명
            </p>
            <div className="flex-1 min-w-0">
              <Input
                className="w-full"
                value={menuName}
                onChange={(e) => onMenuNameChange(e.target.value)}
                placeholder="케이크"
              />
            </div>
          </div>

          <div className="flex flex-col gap-[20px]">
            <p className="whitespace-nowrap typo-lead-semibold text-grey-darker">
              1인당 평균 결제 금액
            </p>
            <ToggleGroup
              type="single"
              value={avgPrice}
              onValueChange={(v) => v && onAvgPriceChange(v)}
              className="flex flex-wrap gap-[12px]"
            >
              {PRICE_OPTIONS.map((p) => (
                <ToggleGroupItem key={p} value={p} className={TOGGLE_ITEM_CLASS}>
                  {p}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>
      </FormRow>
    </section>
  );
}
