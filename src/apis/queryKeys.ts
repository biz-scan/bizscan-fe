export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
};
export const storeKeys = {
  all: ['store'] as const,
  my: (storeId: number) => [...storeKeys.all, 'my', storeId] as const,
};
