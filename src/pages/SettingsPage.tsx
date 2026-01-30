import React from 'react';

import Simbol from '@/assets/icons/Logo/Simbol.svg?react';
import FormRow from '@/components/SettingsPage/FormRow';
import LeftLabel from '@/components/SettingsPage/LeftLabel';
import { Button } from '@/components/ui/Button';
import { ChipFilter } from '@/components/ui/ChipFilter';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/ToggleGroup';

const TOGGLE_ITEM_CLASS = 'h-[60px] px-[28px] py-[16px] rounded-[8px] whitespace-nowrap';

const BIZ_TYPE_MAP: Record<string, string[]> = {
  '카페/베이커리': ['일반 카페', '테이크아웃 전문', '베이커리/디저트'],
  '식당': ['한식/백반/국밥', '고기/구이', '양식/브런치', '일식/중식/아시안', '분식/패스트푸드'],
  '술집/주점': ['요리주점/포차', '이자카야/꼬치', '호프/맥주', '와인/바/칵테일'],
};

const BIZ_TYPES = Object.keys(BIZ_TYPE_MAP);

const PRICE_OPTIONS = ['1만원 미만', '1~2만원대', '2~4만원대', '4만원 이상'];
const AGE_OPTIONS = ['20대', '3040 직장인', '가족 단위', '동네 주민', '관광객'];

const FEATURE_OPTIONS = {
  분위기: ['뷰맛집', '힙한', '조용한', '레트로', '고급진', '활기찬'],
  특징: ['가성비', '혼밥환영', '단체석', '반려동물', '사진맛집'],
  운영: ['홀영업', '배달가능', '포장전문'],
};

const PAIN_OPTIONS = [
  '신규 손님이 너무 안 와요 (모객)',
  '한 번 온 손님이 재방문을 안 해요 (단골 관리)',
  '주변에 경쟁 가게가 너무 많이 생겼어요 ( 경쟁 우위)',
  '매출은 좋은데 남는 게 없어요 (수익성 개선)',
  '메뉴/가격을 어떻게 정할지 모르겠어요 (상품 기획)',
];

export default function SettingsPage() {
  const [form, setForm] = React.useState({
    storeName: '',
    location: '',
    bizType: '',
    subCategory: '',
    menuName: '',
    avgPrice: '',
    features: [] as string[],
    targetCustomers: '',
    painPoint: '',
  });

  const toggleFeature = (name: string) => {
    setForm((prev) => {
      const has = prev.features.includes(name);
      if (has) return { ...prev, features: prev.features.filter((v) => v !== name) };
      if (prev.features.length >= 3) return prev;
      return { ...prev, features: [...prev.features, name] };
    });
  };

  const subCategoryOptions = form.bizType ? BIZ_TYPE_MAP[form.bizType] ?? [] : [];

  const isFormValid =
    form.storeName.trim() !== '' &&
    form.location.trim() !== '' &&
    form.bizType.trim() !== '' &&
    form.subCategory.trim() !== '' &&
    form.menuName.trim() !== '' &&
    form.avgPrice.trim() !== '' &&
    form.features.length > 0 &&
    form.targetCustomers.trim() !== '' &&
    form.painPoint.trim() !== '';

  const onSave = () => {
    if (!isFormValid) return;
    alert('저장되었습니다.');
  };

  return (
    <div className="w-full bg-grey-light">
      <div className="mx-auto w-full max-w-[1348px] px-6 py-10">
        <div className="flex items-center gap-[8px]">
          <Simbol className="h-[32px] w-[32px]" />
          <h3 className="text-blue-dark">매장 정보 수정</h3>
        </div>

        <div className="h-[48px]" />

        <div className="w-full rounded-[20px] shadow-normal bg-grey-light">
          <div className="flex flex-col gap-[100px] p-6 md:p-10 xl:p-[105px]">
            {/* 1) 기본 정보 */}
            <section className="flex flex-col gap-[100px]">
              <FormRow
                label={
                  <div className="lg:flex lg:h-full lg:items-center">
                    <LeftLabel text="매장 이름은 무엇인가요?" />
                  </div>
                }
              >
                <Input
                  className="w-full border-0 focus:border-0 focus:ring-0 outline-none typo-p1-regular text-grey-normal"
                  value={form.storeName}
                  onChange={(e) => setForm({ ...form, storeName: e.target.value })}
                  placeholder="매장의 이름을 입력해주세요."
                />
              </FormRow>

              <FormRow
                label={
                  <div className="lg:flex lg:h-full lg:items-center">
                    <LeftLabel text="매장 위치는 어디인가요?" />
                  </div>
                }
              >
                <Input
                  className="w-full border-0 focus:border-0 focus:ring-0 outline-none typo-p1-regular text-grey-normal"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="서울특별시..."
                />
              </FormRow>
            </section>

            {/* 2) 업종 */}
            <section>
              <FormRow label={<LeftLabel text="어떤 종류의 매장을 운영하시나요?" />}>
                <div className="flex flex-col gap-[24px]">
                  <div className="flex items-center gap-x-[44px]">
                    <p className="min-w-[158px] whitespace-nowrap typo-lead-semibold text-grey-darker">
                      업종 선택
                    </p>

                    <div className="flex-1 min-w-0">
                      <ToggleGroup
                        type="single"
                        value={form.bizType}
                        onValueChange={(v) =>
                          setForm((prev) => ({
                            ...prev,
                            bizType: v,
                            subCategory: '',
                          }))
                        }
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

                  <div className="flex items-center gap-x-[44px]">
                    <p className="min-w-[158px] whitespace-nowrap typo-lead-semibold text-grey-darker">
                      소분류
                    </p>

                    <div className="flex-1 min-w-0">
                      <Select
                        value={form.subCategory}
                        onValueChange={(v) => setForm({ ...form, subCategory: v })}
                        disabled={!form.bizType}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={form.bizType ? '소분류 선택' : '업종을 먼저 선택해주세요'}
                          />
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

            {/* 3) 시그니처 메뉴 + 객단가 */}
            <section>
              <FormRow label={<LeftLabel text="시그니처 메뉴와 객단가" />}>
                <div className="flex w-full flex-col gap-[24px]">
                  <div className="flex items-center gap-x-[44px]">
                    <p className="min-w-[158px] whitespace-nowrap typo-lead-semibold text-grey-darker">
                      대표 메뉴명
                    </p>
                    <div className="flex-1 min-w-0">
                      <Input
                        className="w-full border-0 focus:border-0 focus:ring-0 outline-none typo-p1-regular text-grey-normal"
                        value={form.menuName}
                        onChange={(e) => setForm({ ...form, menuName: e.target.value })}
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
                      value={form.avgPrice}
                      onValueChange={(v) => setForm({ ...form, avgPrice: v })}
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

            {/* 4) 분위기/운영 형태 */}
            <section>
              <FormRow label={<LeftLabel text="매장 분위기 및 운영 형태" />}>
                <div className="flex w-full flex-col gap-[20px]">
                  <p className="typo-lead-semibold text-grey-darker">
                    우리 가게를 가장 잘 표현하는 태그를 선택해주세요. (최대 3개)
                  </p>

                  {Object.entries(FEATURE_OPTIONS).map(([group, items]) => (
                    <div
                      key={group}
                      className="flex flex-col gap-[16px] lg:flex-row lg:items-start lg:gap-[12px]"
                    >
                      <p className="min-w-[48px] pt-1 typo-p2-semibold text-blue-dark">{group}</p>
                      <div className="flex flex-wrap gap-[12px]">
                        {items.map((item) => (
                          <ChipFilter
                            key={item}
                            active={form.features.includes(item)}
                            onClick={() => toggleFeature(item)}
                          >
                            {item}
                          </ChipFilter>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </FormRow>
            </section>

            {/* 5) 주 타겟 고객 */}
            <section>
              <FormRow label={<LeftLabel text="주 타겟 고객" />}>
                <div className="flex w-full flex-col gap-[20px]">
                  <p className="whitespace-nowrap typo-lead-semibold text-grey-darker">
                    주로 어떤 손님이 오시나요? (또는 오길 바라나요?)
                  </p>

                  <ToggleGroup
                    type="single"
                    value={form.targetCustomers}
                    onValueChange={(v) => setForm({ ...form, targetCustomers: v })}
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

            {/* 6) 사장님의 현재 고민 */}
            <section>
              <FormRow label={<LeftLabel text="사장님의 현재 고민" />}>
                <div className="flex w-full flex-col gap-[20px]">
                  <p className="typo-lead-semibold text-grey-darker">
                    지금 가장 해결하고 싶은 문제는 무엇인가요? (하나만 선택)
                  </p>

                  <RadioGroup
                    value={form.painPoint}
                    onValueChange={(v) => setForm({ ...form, painPoint: v })}
                    className="gap-[16px]"
                  >
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

            <div className="flex justify-end">
              <Button size="lg" onClick={onSave} disabled={!isFormValid}>
                저장하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
