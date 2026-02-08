import Simbol from '@/assets/icons/Logo/Simbol.svg?react';
import AtmosphereSection from '@/components/OnboardingPage/AtmosphereSection';
import BasicInfoSection from '@/components/OnboardingPage/BasicInfoSection';
import BusinessTypeSection from '@/components/OnboardingPage/BusinessTypeSection';
import MenuPriceSection from '@/components/OnboardingPage/MenuPriceSection';
import PainPointSection from '@/components/OnboardingPage/PainPointSection';
import TargetAudienceSection from '@/components/OnboardingPage/TargetAudienceSection';
import { Button } from '@/components/ui/Button';
import { useStoreSettingsForm } from '@/hooks/store/useStoreSettingsForm';
import useAuthStore from '@/store/useAuthStore';

export default function SettingsPage() {
  const { user } = useAuthStore();
  const storeId = user?.storeId ?? null;

  const { form, setForm, toggleFeature, isFormValid, isSaving, onSave } =
    useStoreSettingsForm(storeId);

  return (
    <div className="w-full bg-grey-light">
      <div className="mx-auto w-full max-w-[1348px]  pt-[120px] px-6 md:px-10 xl:px-[60px]">
        <div className="flex items-center gap-[8px]">
          <Simbol className="h-[42px] w-[42px]" />
          <h3 className="text-blue-dark">매장 정보 수정</h3>
        </div>

        <div className="h-[48px]" />

        <div className="w-full rounded-[20px] shadow-normal bg-grey-light">
          <div className="flex flex-col gap-[100px] p-6 md:p-10 xl:p-[105px]">

            <BasicInfoSection
              storeName={form.storeName}
              onStoreNameChange={(v) => setForm((prev) => ({ ...prev, storeName: v }))}
              location={form.location}
              onLocationChange={(v) => setForm((prev) => ({ ...prev, location: v }))}
            />

            <BusinessTypeSection
              bizType={form.bizType}
              onBizTypeChange={(v) => setForm((prev) => ({ ...prev, bizType: v, subCategory: '' }))}
              subCategory={form.subCategory}
              onSubCategoryChange={(v) => setForm((prev) => ({ ...prev, subCategory: v }))}
            />

            <MenuPriceSection
              menuName={form.menuName}
              onMenuNameChange={(v) => setForm((prev) => ({ ...prev, menuName: v }))}
              avgPrice={form.avgPrice}
              onAvgPriceChange={(v) => setForm((prev) => ({ ...prev, avgPrice: v }))}
            />

            <AtmosphereSection
              features={form.features}
              onToggleFeature={toggleFeature}
            />

            <TargetAudienceSection
              targetCustomers={form.targetCustomers}
              onTargetCustomersChange={(v) => setForm((prev) => ({ ...prev, targetCustomers: v }))}
            />

            <PainPointSection
              painPoint={form.painPoint}
              onPainPointChange={(v) => setForm((prev) => ({ ...prev, painPoint: v }))}
            />

            <div className="flex justify-end">
              <Button size="lg" onClick={onSave} disabled={!isFormValid || isSaving}>
                {isSaving ? '저장 중...' : '저장하기'}
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
