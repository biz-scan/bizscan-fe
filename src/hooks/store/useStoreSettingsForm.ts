import { useCallback, useMemo, useState } from 'react';

import { useAppQuery } from '@/apis/apiHooks';
import { storeKeys } from '@/apis/queryKeys';
import { getStoreMe } from '@/apis/store/store';
import {
  CATEGORY_MAP,
  CATEGORY_REVERSE_MAP,
  DETAIL_MAP,
  DETAIL_REVERSE_MAP,
  PAIN_MAP,
  PAIN_REVERSE_MAP,
  PRICE_MAP,
  PRICE_REVERSE_MAP,
  TAG_MAP,
  TAG_REVERSE_MAP,
  TARGET_MAP,
  TARGET_REVERSE_MAP,
} from '@/constants/storeMapping';
import { useUpdateStoreAll } from '@/hooks/store/useUpdateStoreAll';
import type { UpdateStoreRequest } from '@/types/store.type';

type FormState = {
  storeName: string;
  location: string;
  bizType: string;
  subCategory: string;
  menuName: string;
  avgPrice: string;
  features: string[];
  targetCustomers: string;
  painPoint: string;
};

const EMPTY_FORM: FormState = {
  storeName: '',
  location: '',
  bizType: '',
  subCategory: '',
  menuName: '',
  avgPrice: '',
  features: [],
  targetCustomers: '',
  painPoint: '',
};

export function useStoreSettingsForm(storeId: number | null) {
  const { data: storeRes, isPending: isStorePending } = useAppQuery(storeKeys.me(), () =>
    getStoreMe()
  );

  const store = storeRes?.result;

  // 1.  FormState 구조
  const initialForm = useMemo((): FormState => {
    if (!store) return EMPTY_FORM;
    return {
      storeName: store.name ?? '',
      location: store.address ?? '',
      bizType: CATEGORY_REVERSE_MAP[store.category] ?? '',
      subCategory: DETAIL_REVERSE_MAP[store.categoryDetail] ?? '',
      menuName: store.signature ?? '',
      avgPrice: PRICE_REVERSE_MAP[store.price] ?? '',
      targetCustomers: TARGET_REVERSE_MAP[store.target] ?? '',
      painPoint: PAIN_REVERSE_MAP[store.painPoint] ?? '',
      features: (store.tags ?? [])
        .map((t) => TAG_REVERSE_MAP[`${t.type}_${t.name}`])
        .filter(Boolean) as string[],
    };
  }, [store]);

  const [prevStoreId, setPrevStoreId] = useState<number | null>(storeId);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [isInitialized, setIsInitialized] = useState(false);

  // 2. storeId 변경 시 상태 리셋
  if (storeId !== prevStoreId) {
    setPrevStoreId(storeId);
    setForm(EMPTY_FORM);
    setIsInitialized(false);
  }

  // 3. 데이터 로드 시 폼 초기값 설정 (1회만)
  if (store && !isInitialized && storeId === prevStoreId) {
    setForm(initialForm);
    setIsInitialized(true);
  }

  const { mutate: patchAll, isPending: isPatchPending } = useUpdateStoreAll();

  // 4. 변경 여부(isDirty) 및 유효성(isValid) 계산
  const isDirty = useMemo(() => {
    return JSON.stringify(form) !== JSON.stringify(initialForm);
  }, [form, initialForm]);

  const isFormValid = useMemo(() => {
    const requiredFields: (keyof FormState)[] = [
      'storeName',
      'location',
      'bizType',
      'subCategory',
      'menuName',
      'avgPrice',
      'targetCustomers',
      'painPoint',
    ];
    const hasAllFields = requiredFields.every((field) => (form[field] as string).trim() !== '');
    return hasAllFields && form.features.length > 0;
  }, [form]);

  const handleStoreNameChange = useCallback(
    (v: string) => setForm((prev) => ({ ...prev, storeName: v })),
    []
  );
  const handleLocationChange = useCallback(
    (v: string) => setForm((prev) => ({ ...prev, location: v })),
    []
  );
  const handleBizTypeChange = useCallback(
    (v: string) => setForm((prev) => ({ ...prev, bizType: v, subCategory: '' })),
    []
  );
  const handleSubCategoryChange = useCallback(
    (v: string) => setForm((prev) => ({ ...prev, subCategory: v })),
    []
  );
  const handleMenuNameChange = useCallback(
    (v: string) => setForm((prev) => ({ ...prev, menuName: v })),
    []
  );
  const handleAvgPriceChange = useCallback(
    (v: string) => setForm((prev) => ({ ...prev, avgPrice: v })),
    []
  );
  const handleTargetCustomersChange = useCallback(
    (v: string) => setForm((prev) => ({ ...prev, targetCustomers: v })),
    []
  );
  const handlePainPointChange = useCallback(
    (v: string) => setForm((prev) => ({ ...prev, painPoint: v })),
    []
  );

  const toggleFeature = useCallback((name: string) => {
    setForm((prev) => {
      const has = prev.features.includes(name);
      if (has) return { ...prev, features: prev.features.filter((v) => v !== name) };
      if (prev.features.length >= 3) return prev;
      return { ...prev, features: [...prev.features, name] };
    });
  }, []);

  const onSave = () => {
    if (!isFormValid || !isDirty || !storeId || isPatchPending) return;

    const data: UpdateStoreRequest = {
      name: form.storeName,
      address: form.location,
      category: CATEGORY_MAP[form.bizType],
      categoryDetail: DETAIL_MAP[form.subCategory],
      signature: form.menuName,
      price: PRICE_MAP[form.avgPrice],
      target: TARGET_MAP[form.targetCustomers],
      painPoint: PAIN_MAP[form.painPoint],
    };

    const tags = Array.from(new Set(form.features.map((f) => TAG_MAP[f]).filter(Boolean))).slice(
      0,
      3
    );
    patchAll({ storeId, data, tags });
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
    isFormValid: isFormValid && isDirty, // 유효하고 "변경사항"이 있을 때만 true
    isPatchPending,
    isStorePending,
    onSave,
  };
}
