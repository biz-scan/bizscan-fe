import { useEffect, useRef, useState } from 'react';

import { useAppQuery } from '@/apis/apiHooks';
import { storeKeys } from '@/apis/queryKeys';
import { getStore } from '@/apis/store/store';
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
  const { data: storeRes } = useAppQuery(
    storeKeys.my(storeId ?? 0),
    () => getStore(storeId ?? 0),
    { enabled: !!storeId }
  );

  const store = storeRes?.result;
  const isStoreReady = !!storeId && !!storeRes?.isSuccess && !!store;

  const { mutate: patchAll, isPending } = useUpdateStoreAll();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const initializedRef = useRef(false);

  useEffect(() => {
    initializedRef.current = false;
    if (!storeId) setForm(EMPTY_FORM);
  }, [storeId]);

  useEffect(() => {
    if (!isStoreReady) return;
    if (initializedRef.current) return;

    initializedRef.current = true;

    setForm({
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
    });
  }, [isStoreReady, store]);

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
    if (!storeId) return;
    if (isPending) return;

    const category = CATEGORY_MAP[form.bizType];
    const categoryDetail = DETAIL_MAP[form.subCategory];
    const price = PRICE_MAP[form.avgPrice];
    const target = TARGET_MAP[form.targetCustomers];
    const painPoint = PAIN_MAP[form.painPoint];

    if (!category || !categoryDetail || !price || !target || !painPoint) return;

    const data: UpdateStoreRequest = {
      name: form.storeName,
      address: form.location,
      category,
      categoryDetail,
      signature: form.menuName,
      price,
      target,
      painPoint,
    };

    const tags = Array.from(new Set(form.features.map((f) => TAG_MAP[f]).filter(Boolean))).slice(
      0,
      3
    );

    if (tags.length === 0) return;

    patchAll({ storeId, data, tags });
  };

  return {
    form,
    setForm,
    toggleFeature,
    isFormValid,
    isSaving: isPending,
    onSave,
  };
}
