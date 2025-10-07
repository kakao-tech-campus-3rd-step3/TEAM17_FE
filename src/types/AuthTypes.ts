export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  birthDate: string;
  gender: 'MALE' | 'FEMALE';
  phoneNumber: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  userId: number;
  email: string;
  name: string;
  nickname: string;
  provider: 'EMAIL' | 'KAKAO' | 'GOOGLE' | 'NAVER';
  providerId: string;
  profileImageUrl: string;
  role: 'USER' | 'ADMIN';
  birthDate: string;
  gender: 'MALE' | 'FEMALE';
  phoneNumber: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface RefreshResponse {
  accessToken: string;
}
