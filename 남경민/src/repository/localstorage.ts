const TOKEN_LOCAL_STORAGE_KEY = 'kyeongmin_todo_token';
const USER_KEY = 'login_user';

export interface UserType {
  id: string;
  name: string;
  email: string;
  token: string;
}

export const TokenLocalStorageRepository = {
  getToken: () => {
    return localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
  },
  setToken: ({ token }: { token: string }) => {
    localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, token);
  },
};

export const UserLocalStorageRepository = {
  setUser: (user: UserType) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  getUser: (): UserType | null => {
    const value = localStorage.getItem(USER_KEY);
    if (value === null) {
      return null;
    }
    try {
      return JSON.parse(value) as UserType;
    } catch {
      return null;
    }
  },
  clearUser: () => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem('token');
  },
};
