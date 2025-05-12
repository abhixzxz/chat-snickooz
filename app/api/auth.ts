import { api } from './index';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  dateOfBirth: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  avatar: string;
  status: string;
  isEmailVerified: boolean;
  lastActive: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface AuthResponse {
  status: string;
  data: {
    user: User;
    token: string;
  };
}

export const authApi = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    return api.post('/users/login', payload);
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const formattedPayload = {
      ...payload,
      dateOfBirth: payload.dateOfBirth,
    };
    return api.post('/users/register', formattedPayload);
  },
};