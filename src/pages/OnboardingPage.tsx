import React from 'react';

import MainIcon from '@/assets/icons/Icon/type=main.svg?react';
import AtmosphereSection from '@/components/OnboardingPage/AtmosphereSection';
import BasicInfoSection from '@/components/OnboardingPage/BasicInfoSection';
import BusinessTypeSection from '@/components/OnboardingPage/BusinessTypeSection';
import MenuPriceSection from '@/components/OnboardingPage/MenuPriceSection';
import PainPointSection from '@/components/OnboardingPage/PainPointSection';
import TargetAudienceSection from '@/components/OnboardingPage/TargetAudienceSection';
import { Button } from '@/components/ui/Button';
import {
  CATEGORY_MAP,
  DETAIL_MAP,
  PAIN_MAP,
  PRICE_MAP,
  TAG_MAP,
  TARGET_MAP,
} from '@/constants/storeMapping';
import { usePostStore } from '@/hooks/store';
import useAuthStore from '@/store/useAuthStore';
import type { RegisterStoreRequest } from '@/types/store.type';

export default function SettingsPage() {
  const { mutate: postStore, isPending: isPosting } = usePostStore();
  const { user } = useAuthStore();
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

    const requestData: RegisterStoreRequest = {
      name: form.storeName,
      address: form.location,
      category: CATEGORY_MAP[form.bizType],
      categoryDetail: DETAIL_MAP[form.subCategory],
      signature: form.menuName,
      price: PRICE_MAP[form.avgPrice],
      target: TARGET_MAP[form.targetCustomers],
      painPoint: PAIN_MAP[form.painPoint],
      tags: form.features.map((f) => TAG_MAP[f] || f),
    };

    postStore(requestData);
  };

  const isLoading = isPosting;

  return (
    <div className="w-full bg-grey-light">
      <div
        className="flex items-center justify-center h-110 flex-col bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/background.png')" }}
      >
        <MainIcon className="mb-10" />
        <h2 className="mb-2.5">매장 정보 입력</h2>
        <p className="text-grey-dark typo-p2-medium">
          {user?.nickname}님의 가게 정보를 입력해주세요.
        </p>
      </div>
      <div className="mx-auto w-full max-w-[1348px] px-6 py-15">
        <div className="w-full rounded-[20px] shadow-normal bg-grey-light">
          <div className="flex flex-col gap-[100px] p-6 md:p-10 xl:p-[105px]">
            {/* 1) 기본 정보 */}
            <BasicInfoSection
              storeName={form.storeName}
              onStoreNameChange={(v) => setForm((prev) => ({ ...prev, storeName: v }))}
              location={form.location}
              onLocationChange={(v) => setForm((prev) => ({ ...prev, location: v }))}
            />

            {/* 2) 업종 */}
            <BusinessTypeSection
              bizType={form.bizType}
              onBizTypeChange={(v) => setForm((prev) => ({ ...prev, bizType: v, subCategory: '' }))}
              subCategory={form.subCategory}
              onSubCategoryChange={(v) => setForm((prev) => ({ ...prev, subCategory: v }))}
            />

            {/* 3) 시그니처 메뉴 + 객단가 */}
            <MenuPriceSection
              menuName={form.menuName}
              onMenuNameChange={(v) => setForm((prev) => ({ ...prev, menuName: v }))}
              avgPrice={form.avgPrice}
              onAvgPriceChange={(v) => setForm((prev) => ({ ...prev, avgPrice: v }))}
            />

            {/* 4) 분위기/운영 형태 */}
            <AtmosphereSection features={form.features} onToggleFeature={toggleFeature} />

            {/* 5) 주 타겟 고객 */}
            <TargetAudienceSection
              targetCustomers={form.targetCustomers}
              onTargetCustomersChange={(v) => setForm((prev) => ({ ...prev, targetCustomers: v }))}
            />

            {/* 6) 사장님의 현재 고민 */}
            <PainPointSection
              painPoint={form.painPoint}
              onPainPointChange={(v) => setForm((prev) => ({ ...prev, painPoint: v }))}
            />

            <div className="flex justify-end">
              <Button size="lg" onClick={onSave} disabled={!isFormValid || isLoading}>
                {isLoading ? '저장 중...' : '저장하기'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
