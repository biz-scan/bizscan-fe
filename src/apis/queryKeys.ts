export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
};

export const analysisKeys = {
  all: ['analysis'] as const,
  swots: (storeId?: number) => [...analysisKeys.all, 'swots', storeId] as const,
  swotDiagnosis: (swotId: number) =>
    [...analysisKeys.all, 'swots', swotId, 'diagnosis'] as const,
  catchphrase: (storeId?: number) =>
    [...analysisKeys.all, 'catchphrase', storeId] as const,
  actionPlans: (storeId?: number) =>
    [...analysisKeys.all, 'action-plans', storeId] as const,
  actionPlanDetail: (actionPlanId: number) =>
    [...analysisKeys.actionPlans(), actionPlanId] as const,
  status: (requestId: string) => [...analysisKeys.all, 'status', requestId] as const,
};
