// src/contexts/AuthContext.ts
import { createContext } from 'react';
import type { AuthContextType } from '@/types/auth';

/**
 * ✅ AuthContext: 전역 로그인 상태를 담는 컨텍스트
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
