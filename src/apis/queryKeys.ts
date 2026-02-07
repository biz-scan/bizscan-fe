export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
};
export const storeKeys = {
  all: ['store'] as const,
  my: (storeId: number) => [...storeKeys.all, 'my', storeId] as const,
};
export const noteKeys = {
  all: ['note'] as const,

  lists: () => [...noteKeys.all, 'list'] as const,
  list: (storeId: number, isCompleted: boolean) =>
    [...noteKeys.lists(), storeId, isCompleted] as const,

  details: () => [...noteKeys.all, 'detail'] as const,
  detail: (actionPlanId: number) => [...noteKeys.details(), actionPlanId] as const,
};