import MainIcon from '@/assets/icons/Icon/type=main.svg?react';
import AtmosphereSection from '@/components/OnboardingPage/AtmosphereSection';
import BasicInfoSection from '@/components/OnboardingPage/BasicInfoSection';
import BusinessTypeSection from '@/components/OnboardingPage/BusinessTypeSection';
import MenuPriceSection from '@/components/OnboardingPage/MenuPriceSection';
import PainPointSection from '@/components/OnboardingPage/PainPointSection';
import TargetAudienceSection from '@/components/OnboardingPage/TargetAudienceSection';
import { Button } from '@/components/ui/Button';
import { useStoreOnboardingForm } from '@/hooks/store/useStoreOnboardingForm';
import useAuthStore from '@/store/useAuthStore';

export default function OnboardingPage() {
  const { user } = useAuthStore();
  const {
    form,
    handleStoreNameChange,
    handleLocationChange,
    handleBizTypeChange,
    handleSubCategoryChange,
    handleMenuNameChange,
    handleAvgPriceChange,
    handleTargetCustomersChange,
    handlePainPointChange,
    toggleFeature,
    isFormValid,
    isPosting,
    onSave,
  } = useStoreOnboardingForm();

  return (
    <div className="flex flex-col w-full min-h-screen bg-grey-light">
      {/* 상단 히어로 섹션 */}
      <div
        className="flex flex-col items-center justify-center shrink-0 h-110 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/background.png')" }}
      >
        <MainIcon className="mb-10" />
        <h2 className="mb-2.5 text-blue-dark text-[32px] font-bold">매장 정보 입력</h2>
        <p className="text-grey-dark typo-p2-medium">
          {user?.nickname}님의 가게 정보를 입력해주세요.
        </p>
      </div>

      {/* 하단 폼 섹션 */}
      <div className="flex-1 flex flex-col mx-auto w-full max-w-[1348px] px-4 sm:px-6 py-15">
        <div className="flex-1 flex flex-col w-full rounded-[20px] shadow-normal bg-grey-light overflow-hidden">
          <div className="flex flex-col gap-12 xl:gap-[100px] p-4 sm:p-6 md:p-10 xl:p-[100px]">
            <BasicInfoSection
              storeName={form.storeName}
              onStoreNameChange={handleStoreNameChange}
              location={form.location}
              onLocationChange={handleLocationChange}
            />

            <BusinessTypeSection
              bizType={form.bizType}
              onBizTypeChange={handleBizTypeChange}
              subCategory={form.subCategory}
              onSubCategoryChange={handleSubCategoryChange}
            />

            <MenuPriceSection
              menuName={form.menuName}
              onMenuNameChange={handleMenuNameChange}
              avgPrice={form.avgPrice}
              onAvgPriceChange={handleAvgPriceChange}
            />

            <AtmosphereSection features={form.features} onToggleFeature={toggleFeature} />

            <TargetAudienceSection
              targetCustomers={form.targetCustomers}
              onTargetCustomersChange={handleTargetCustomersChange}
            />

            <PainPointSection
              painPoint={form.painPoint}
              onPainPointChange={handlePainPointChange}
            />

            <div className="flex justify-end pt-4">
              <Button
                size="lg"
                onClick={onSave}
                disabled={!isFormValid || isPosting}
                className="min-w-[120px]"
              >
                {isPosting ? '저장 중...' : '저장하기'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
