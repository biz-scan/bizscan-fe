export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
};

export const analysisKeys = {
  all: ['analysis'] as const,
  swots: (storeId?: number) => [...analysisKeys.all, 'swots', storeId] as const,
  swotDiagnosis: (swotId: number) =>
    [...analysisKeys.all, 'swots', swotId, 'diagnosis'] as const,
  catchphrase: () => [...analysisKeys.all, 'catchphrase'] as const,
  actionPlans: () => [...analysisKeys.all, 'action-plans'] as const,
  actionPlanDetail: (actionPlanId: number) =>
    [...analysisKeys.actionPlans(), actionPlanId] as const,
  status: (requestId: string) => [...analysisKeys.all, 'status', requestId] as const,
};
