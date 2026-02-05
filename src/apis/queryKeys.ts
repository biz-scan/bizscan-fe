export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
};
export const storeKeys = {
  all: ['store'] as const,
  my: () => [...storeKeys.all, 'my'] as const,
};
