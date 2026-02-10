import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import {
  CATEGORY_MAP,
  DETAIL_MAP,
  PAIN_MAP,
  PRICE_MAP,
  TAG_MAP,
  TARGET_MAP,
} from '@/constants/storeMapping';
import { usePostStore } from '@/hooks/store';
import type { RegisterStoreRequest } from '@/types/store.type';

export function useStoreOnboardingForm() {
  const navigate = useNavigate();
  const { mutate: postStore, isPending: isPosting } = usePostStore();

  const [form, setForm] = useState({
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

  const handleStoreNameChange = useCallback((v: string) => setForm((prev) => ({ ...prev, storeName: v })), []);
  const handleLocationChange = useCallback((v: string) => setForm((prev) => ({ ...prev, location: v })), []);
  const handleBizTypeChange = useCallback((v: string) => setForm((prev) => ({ ...prev, bizType: v, subCategory: '' })), []);
  const handleSubCategoryChange = useCallback((v: string) => setForm((prev) => ({ ...prev, subCategory: v })), []);
  const handleMenuNameChange = useCallback((v: string) => setForm((prev) => ({ ...prev, menuName: v })), []);
  const handleAvgPriceChange = useCallback((v: string) => setForm((prev) => ({ ...prev, avgPrice: v })), []);
  const handleTargetCustomersChange = useCallback((v: string) => setForm((prev) => ({ ...prev, targetCustomers: v })), []);
  const handlePainPointChange = useCallback((v: string) => setForm((prev) => ({ ...prev, painPoint: v })), []);

  const toggleFeature = useCallback((name: string) => {
    setForm((prev) => {
      const has = prev.features.includes(name);
      if (has) return { ...prev, features: prev.features.filter((v) => v !== name) };
      if (prev.features.length >= 3) return prev;
      return { ...prev, features: [...prev.features, name] };
    });
  }, []);

  const isFormValid = useMemo(() => {
    return (
      form.storeName.trim() !== '' &&
      form.location.trim() !== '' &&
      form.bizType.trim() !== '' &&
      form.subCategory.trim() !== '' &&
      form.menuName.trim() !== '' &&
      form.avgPrice.trim() !== '' &&
      form.features.length > 0 &&
      form.targetCustomers.trim() !== '' &&
      form.painPoint.trim() !== ''
    );
  }, [form]);

  const onSave = () => {
    if (!isFormValid || isPosting) return;

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

    postStore(requestData, {
      onSuccess: (res) => {
        if (res.isSuccess && res.requestId) {
          navigate(`/analyze/${res.requestId}`);
        }
      },
      onError: (error) => {
        console.error('매장 등록 실패:', error);
        toast.error('매장 등록 중 에러가 발생했습니다. 입력 정보를 확인해주세요.');
      },
    });
  };

  return {
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
  };
}
