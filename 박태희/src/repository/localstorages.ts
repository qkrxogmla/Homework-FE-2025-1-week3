const TOKEN_LOCAL_STORAGE_KEY = 'pironeer_token';

export const TokenLocalStorageRepository = {
  getToken: () => {
    return localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
  },
  setToken: ({ token }: { token: string }) => {
    localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, token);
  },
};
