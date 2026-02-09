export const storeKeys = {
  all: ['store'] as const,
  my: (storeId: number) => [...storeKeys.all, 'my', storeId] as const,
};

export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
};

export const noteKeys = {
  all: ['note'] as const,

  lists: () => [...noteKeys.all, 'list'] as const,
  list: (storeId: number, isCompleted: boolean) =>
    [...noteKeys.lists(), storeId, isCompleted] as const,

  details: () => [...noteKeys.all, 'detail'] as const,
  detail: (actionPlanId: number) => [...noteKeys.details(), actionPlanId] as const,
};

export const analysisKeys = {
  all: ['analysis'] as const,

  swots: (storeId?: number) => [...analysisKeys.all, 'swots', storeId] as const,
  swotDiagnosis: (swotId: number) => [...analysisKeys.all, 'swots', swotId, 'diagnosis'] as const,
  catchphrase: (storeId?: number) => [...analysisKeys.all, 'catchphrase', storeId] as const,
  actionPlans: (storeId?: number, swotType?: string) =>
    [...analysisKeys.all, 'action-plans', storeId, swotType] as const,
  actionPlanDetail: (actionPlanId: number) =>
    [...analysisKeys.actionPlans(actionPlanId), actionPlanId] as const,

  status: (requestId: string) => [...analysisKeys.all, 'status', requestId] as const,
};
