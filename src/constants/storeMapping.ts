import type {
  CategoryDetail,
  PainPoint,
  PriceRange,
  StoreCategory,
  TargetAudience,
} from '../types/store.type';

export const CATEGORY_MAP: Record<string, StoreCategory> = {
  '카페/베이커리': 'CAFE_BAKERY',
  식당: 'RESTAURANT',
  '술집/주점': 'BAR',
};

export const CATEGORY_REVERSE_MAP: Record<StoreCategory, string> = {
  CAFE_BAKERY: '카페/베이커리',
  RESTAURANT: '식당',
  BAR: '술집/주점',
};

export const DETAIL_MAP: Record<string, CategoryDetail> = {
  // 카페/베이커리
  '일반 카페': 'GENERAL_CAFE',
  '테이크아웃 전문': 'TAKEOUT_ONLY',
  '베이커리/디저트': 'BAKERY_DESSERT',
  // 식당
  '한식/백반/국밥': 'KOREAN',
  '고기/구이': 'GRILL',
  '양식/브런치': 'WESTERN_BRUNCH',
  '일식/중식/아시안': 'ASIAN',
  '분식/패스트푸드': 'FAST_FOOD',
  // 술집/주점
  '요리주점/포차': 'POCHA',
  '이자카야/꼬치': 'IZAKAYA',
  '호프/맥주': 'BEER_HALL',
  '와인/바/칵테일': 'WINE_BAR',
};

export const DETAIL_REVERSE_MAP: Record<CategoryDetail, string> = {
  GENERAL_CAFE: '일반 카페',
  TAKEOUT_ONLY: '테이크아웃 전문',
  BAKERY_DESSERT: '베이커리/디저트',
  KOREAN: '한식/백반/국밥',
  GRILL: '고기/구이',
  WESTERN_BRUNCH: '양식/브런치',
  ASIAN: '일식/중식/아시안',
  FAST_FOOD: '분식/패스트푸드',
  POCHA: '요리주점/포차',
  IZAKAYA: '이자카야/꼬치',
  BEER_HALL: '호프/맥주',
  WINE_BAR: '와인/바/칵테일',
};

export const PRICE_MAP: Record<string, PriceRange> = {
  '1만원 미만': 'UNDER_10000',
  '1~2만원대': 'FROM_10000_TO_20000',
  '2~4만원대': 'FROM_20000_TO_40000',
  '4만원 이상': 'OVER_40000',
};

export const PRICE_REVERSE_MAP: Record<PriceRange, string> = {
  UNDER_10000: '1만원 미만',
  FROM_10000_TO_20000: '1~2만원대',
  FROM_20000_TO_40000: '2~4만원대',
  OVER_40000: '4만원 이상',
};

export const TARGET_MAP: Record<string, TargetAudience> = {
  '20대': 'TWENTIES',
  '3040 직장인': 'THIRTIES_FORTIES',
  '가족 단위': 'FAMILY',
  '동네 주민': 'LOCAL_RESIDENT',
  관광객: 'TOURIST',
};

export const TARGET_REVERSE_MAP: Record<TargetAudience, string> = {
  TWENTIES: '20대',
  THIRTIES_FORTIES: '3040 직장인',
  FAMILY: '가족 단위',
  LOCAL_RESIDENT: '동네 주민',
  TOURIST: '관광객',
};

export const PAIN_MAP: Record<string, PainPoint> = {
  '신규 손님이 너무 안 와요 (모객)': 'CUSTOMER_ACQUISITION',
  '한 번 온 손님이 재방문을 안 해요 (단골 관리)': 'LOYALTY_MANAGEMENT',
  '주변에 경쟁 가게가 너무 많이 생겼어요 (경쟁 우위)': 'COMPETITIVE_EDGE',
  '매출은 좋은데 남는 게 없어요 (수익성 개선)': 'PROFIT_IMPROVEMENT',
  '메뉴/가격을 어떻게 정할지 모르겠어요 (상품 기획)': 'PRODUCT_PLANNING',
};

export const PAIN_REVERSE_MAP: Record<PainPoint, string> = {
  CUSTOMER_ACQUISITION: '신규 손님이 너무 안 와요 (모객)',
  LOYALTY_MANAGEMENT: '한 번 온 손님이 재방문을 안 해요 (단골 관리)',
  COMPETITIVE_EDGE: '주변에 경쟁 가게가 너무 많이 생겼어요 (경쟁 우위)',
  PROFIT_IMPROVEMENT: '매출은 좋은데 남는 게 없어요 (수익성 개선)',
  PRODUCT_PLANNING: '메뉴/가격을 어떻게 정할지 모르겠어요 (상품 기획)',
};

export const TAG_MAP: Record<string, string> = {
  뷰맛집: 'MOOD_VIEW',
  힙한: 'MOOD_HIP',
  조용한: 'MOOD_QUIET',
  레트로: 'MOOD_RETRO',
  고급진: 'MOOD_LUXURY',
  활기찬: 'MOOD_LIVELY',
  가성비: 'FEATURE_GOOD_VALUE',
  혼밥환영: 'FEATURE_SOLO_FRIENDLY',
  단체석: 'FEATURE_GROUP_SEAT',
  반려동물: 'FEATURE_PET_FRIENDLY',
  사진맛집: 'FEATURE_PHOTO_SPOT',
  홀영업: 'OPERATION_HALL_SERVICE',
  배달가능: 'OPERATION_DELIVERY_AVAILABLE',
  포장전문: 'OPERATION_TAKEOUT_ONLY',
};

export const TAG_REVERSE_MAP: Record<string, string> = Object.entries(TAG_MAP).reduce(
  (acc, [k, v]) => ({ ...acc, [v]: k }),
  {}
);
