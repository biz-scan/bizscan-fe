import { memo } from 'react';

import FieldLabel from '@/components/common/FieldLabel';
import FormRow from '@/components/SettingsPage/FormRow';
import { ChipFilter } from '@/components/ui/ChipFilter';

const FEATURE_OPTIONS = {
  분위기: ['뷰맛집', '힙한', '조용한', '레트로', '고급진', '활기찬'],
  특징: ['가성비', '혼밥환영', '단체석', '반려동물', '사진맛집'],
  운영: ['홀영업', '배달가능', '포장전문'],
};

interface AtmosphereSectionProps {
  features: string[];
  onToggleFeature: (name: string) => void;
}

export default memo(function AtmosphereSection({ features, onToggleFeature }: AtmosphereSectionProps) {
  return (
    <section>
      <FormRow label={<FieldLabel text="매장 분위기 및 운영 형태" />}>
        <div className="flex w-full flex-col gap-[20px]">
          <p className="typo-lead-semibold text-grey-darker">
            우리 가게를 가장 잘 표현하는 태그를 선택해주세요. (최대 3개)
          </p>

          {Object.entries(FEATURE_OPTIONS).map(([group, items]) => (
            <div
              key={group}
              className="flex flex-col gap-2 xl:flex-row xl:items-start xl:gap-[12px]"
            >
              <p className="min-w-[48px] pt-1 typo-p2-semibold text-blue-dark">{group}</p>
              <div className="flex flex-wrap gap-2 lg:gap-[12px]">
                {items.map((item) => (
                  <ChipFilter
                    key={item}
                    active={features.includes(item)}
                    onClick={() => onToggleFeature(item)}
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
  );
});
