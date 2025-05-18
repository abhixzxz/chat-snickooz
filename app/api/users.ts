import { api } from './index';
import { User } from './auth';

export interface RandomUsersResponse {
  status: string;
  data: {
    users: User[];
  };
}

export const usersApi = {
  getRandomUsers: async (): Promise<RandomUsersResponse> => {
    return api.get('/users/random');
  },
};