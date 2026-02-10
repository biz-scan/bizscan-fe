import FieldLabel from '@/components/common/FieldLabel';
import FormRow from '@/components/SettingsPage/FormRow';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/ToggleGroup';

const TOGGLE_ITEM_CLASS = 'h-[60px] px-[28px] py-[16px] rounded-[8px] whitespace-nowrap';

const BIZ_TYPE_MAP: Record<string, string[]> = {
  '카페/베이커리': ['일반 카페', '테이크아웃 전문', '베이커리/디저트'],
  식당: ['한식/백반/국밥', '고기/구이', '양식/브런치', '일식/중식/아시안', '분식/패스트푸드'],
  '술집/주점': ['요리주점/포차', '이자카야/꼬치', '호프/맥주', '와인/바/칵테일'],
};

const BIZ_TYPES = Object.keys(BIZ_TYPE_MAP);

interface BusinessTypeSectionProps {
  bizType: string;
  onBizTypeChange: (value: string) => void;
  subCategory: string;
  onSubCategoryChange: (value: string) => void;
}

export default function BusinessTypeSection({
  bizType,
  onBizTypeChange,
  subCategory,
  onSubCategoryChange,
}: BusinessTypeSectionProps) {
  const subCategoryOptions = bizType ? (BIZ_TYPE_MAP[bizType] ?? []) : [];

  return (
    <section>
      <FormRow label={<FieldLabel text="어떤 종류의 매장을 운영하시나요?" />}>
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:gap-x-[44px]">
            <p className="xl:min-w-[158px] whitespace-nowrap typo-lead-semibold text-grey-darker">
              업종 선택
            </p>

            <div className="flex-1 min-w-0">
              <ToggleGroup
                type="single"
                value={bizType}
                onValueChange={(v) => v && onBizTypeChange(v)}
                className="flex flex-wrap gap-[12px]"
              >
                {BIZ_TYPES.map((t) => (
                  <ToggleGroupItem key={t} value={t} className={TOGGLE_ITEM_CLASS}>
                    {t}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </div>

          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:gap-x-[44px]">
            <p className="xl:min-w-[158px] whitespace-nowrap typo-lead-semibold text-grey-darker">
              소분류
            </p>

            <div className="flex-1 min-w-0">
              <Select value={subCategory} onValueChange={onSubCategoryChange} disabled={!bizType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={bizType ? '소분류 선택' : '업종을 먼저 선택해주세요'} />
                </SelectTrigger>
                <SelectContent>
                  {subCategoryOptions.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </FormRow>
    </section>
  );
}
