import SimbolLogo from '@/assets/icons/Logo/Simbol.svg?react';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
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

  const { form, setForm, toggleFeature, isFormValid, isPatchPending, isStorePending, onSave } =
    useStoreSettingsForm(storeId);

  return (
    <div className="flex flex-col w-full min-h-screen bg-grey-light">
      {/* 중앙 정렬을 위한 컨테이너 */}
      <div className="mx-auto w-full max-w-[1348px] pt-16 xl:pt-[120px] px-4 sm:px-6 md:px-10 xl:px-[60px] pb-15 flex-1 flex flex-col">
        {/* 헤더 섹션 */}
        <div className="flex items-center gap-[20px] mb-[48px] shrink-0">
          <SimbolLogo className="w-[42px] h-[42px] shrink-0" />
          <h2 className="text-blue-dark text-[32px] font-bold">매장 정보 수정</h2>
        </div>

        {/* 메인 카드 영역: flex-1로 로딩 시 중앙 정렬 보장 */}
        <div className="flex-1 flex flex-col w-full rounded-[20px] shadow-normal bg-grey-light overflow-hidden">
          {isStorePending ? (
            <div className="flex-1 flex items-center justify-center min-h-[400px]">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="flex flex-col gap-12 xl:gap-[100px] p-4 sm:p-6 md:p-10 xl:p-[80px]">
              <BasicInfoSection
                storeName={form.storeName}
                onStoreNameChange={(v) => setForm((prev) => ({ ...prev, storeName: v }))}
                location={form.location}
                onLocationChange={(v) => setForm((prev) => ({ ...prev, location: v }))}
              />

              <BusinessTypeSection
                bizType={form.bizType}
                onBizTypeChange={(v) =>
                  setForm((prev) => ({ ...prev, bizType: v, subCategory: '' }))
                }
                subCategory={form.subCategory}
                onSubCategoryChange={(v) => setForm((prev) => ({ ...prev, subCategory: v }))}
              />

              <MenuPriceSection
                menuName={form.menuName}
                onMenuNameChange={(v) => setForm((prev) => ({ ...prev, menuName: v }))}
                avgPrice={form.avgPrice}
                onAvgPriceChange={(v) => setForm((prev) => ({ ...prev, avgPrice: v }))}
              />

              <AtmosphereSection features={form.features} onToggleFeature={toggleFeature} />

              <TargetAudienceSection
                targetCustomers={form.targetCustomers}
                onTargetCustomersChange={(v) =>
                  setForm((prev) => ({ ...prev, targetCustomers: v }))
                }
              />

              <PainPointSection
                painPoint={form.painPoint}
                onPainPointChange={(v) => setForm((prev) => ({ ...prev, painPoint: v }))}
              />

              {/* 하단 저장 버튼 */}
              <div className="flex justify-end pt-4">
                <Button
                  size="lg"
                  onClick={onSave}
                  disabled={!isFormValid || isPatchPending}
                  className="min-w-[120px]"
                >
                  {isPatchPending ? '저장 중...' : '저장하기'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
