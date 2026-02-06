import type { CommonResponse } from './api.type';

export type StoreCategory = 'CAFE_BAKERY' | 'RESTAURANT' | 'BAR_PUB';

export type CafeBakeryDetail = 'GENERAL_CAFE' | 'TAKEOUT_ONLY' | 'BAKERY_DESSERT';
export type RestaurantDetail = 'KOREAN' | 'GRILL' | 'WESTERN_BRUNCH' | 'ASIAN' | 'FAST_FOOD';
export type BarPubDetail = 'POCHA' | 'IZAKAYA' | 'BEER_HALL' | 'WINE_BAR';

export type CategoryDetail = CafeBakeryDetail | RestaurantDetail | BarPubDetail;

export type PriceRange =
  | 'UNDER_10000'
  | 'FROM_10000_TO_20000'
  | 'FROM_20000_TO_40000'
  | 'OVER_40000';

export type TargetAudience =
  | 'TWENTIES'
  | 'THIRTIES_FORTIES'
  | 'FAMILY'
  | 'LOCAL_RESIDENT'
  | 'TOURIST';

export type PainPoint =
  | 'CUSTOMER_ACQUISITION'
  | 'LOYALTY_MANAGEMENT'
  | 'COMPETITIVE_EDGE'
  | 'PROFIT_IMPROVEMENT'
  | 'PRODUCT_PLANNING';

export type StoreTag =
  // 분위기
  | 'MOOD_VIEW'
  | 'MOOD_HIP'
  | 'MOOD_QUIET'
  | 'MOOD_RETRO'
  | 'MOOD_LUXURY'
  | 'MOOD_LIVELY'
  // 특징
  | 'FEATURE_GOOD_VALUE'
  | 'FEATURE_SOLO_FRIENDLY'
  | 'FEATURE_GROUP_SEAT'
  | 'FEATURE_PET_FRIENDLY'
  | 'FEATURE_PHOTO_SPOT'
  // 운영
  | 'OPERATION_HALL_SERVICE'
  | 'OPERATION_DELIVERY_AVAILABLE'
  | 'OPERATION_TAKEOUT_ONLY';

export type StoreTagType = 'MOOD' | 'FEATURE' | 'OPERATION';

export type StoreTagInfo = {
  id: number;
  type: StoreTagType;
  name: string;
};

export type Store = {
  storeId: number;
  name: string;
  address: string;
  lat: number;
  lon: number;
  category: StoreCategory;
  categoryDetail: CategoryDetail;
  signature: string;
  price: PriceRange;
  target: TargetAudience;
  painPoint: PainPoint;
  tags: StoreTagInfo[];
};

export type RegisterStoreRequest = {
  name: string;
  address: string;
  category: StoreCategory;
  categoryDetail: CategoryDetail;
  signature: string;
  price: PriceRange;
  target: TargetAudience;
  painPoint: PainPoint;
  tags: string[];
};

export type UpdateStoreRequest = Partial<Omit<RegisterStoreRequest, 'tags'>>;

/* RESPONSE */
export type GetStoreResponse = CommonResponse<Store>;
export type RegisterStoreResponse = CommonResponse<Store>;
export type UpdateStoreResponse = CommonResponse<Store>;
