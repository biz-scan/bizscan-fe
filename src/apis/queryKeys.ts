export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
};

export const analysisKeys = {
  all: ['analysis'] as const,
  swots: () => [...analysisKeys.all, 'swots'] as const,
  swotDiagnosis: (swotId: number) => [...analysisKeys.swots(), swotId, 'diagnosis'] as const,
  catchphrase: () => [...analysisKeys.all, 'catchphrase'] as const,
  actionPlans: () => [...analysisKeys.all, 'action-plans'] as const,
  actionPlanDetail: (actionPlanId: number) =>
    [...analysisKeys.actionPlans(), actionPlanId] as const,
  status: (requestId: string) => [...analysisKeys.all, 'status', requestId] as const,
};
