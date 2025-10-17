import { createContext } from 'react';

type AuthContextType = {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
