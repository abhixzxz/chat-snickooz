
import { api } from './index';
import { User } from './auth';

interface Connection {
  connectionId: string;
  user: User;
  lastMessage?: {
    text: string;
    createdAt: string;
  };
  lastMessageTime?: string;
  unreadCount: number;
}

interface ConnectionResponse {
  connections: Connection[];
}

interface RandomUsersResponse {
  users: User[];
}

export const connectionsApi = {
  getUserConnections: async (): Promise<ConnectionResponse> => {
    const response = await api.get('/connections');
    console.log(response,"rese")
    // if (!response.data || !Array.isArray(response.data.connections)) {
    //   return { connections: [] };
    // }
    return response?.connections;
  },

  // Create a new connection request
  createConnection: async (recipientId: string): Promise<{ connection: Connection; message: string }> => {
    const response = await api.post('/connections', { recipientId });
    if (!response.data.connection) {
      throw new Error(response.data.message || 'Failed to create connection');
    }
    return response.data;
  },

  // Update connection status
  updateConnectionStatus: async (connectionId: string, status: 'accepted' | 'rejected') => {
    const response = await api.patch(`/connections/${connectionId}`, { status });
    return response.data;
  },

  // Get random users for connection suggestions
  getRandomUsers: async (filters: { gender?: string; ageGroup?: string }): Promise<RandomUsersResponse> => {
    const params = new URLSearchParams(filters as Record<string, string>);
    const response = await api.get(`/connections/suggestions?${params}`);
    return response.data;
  }
};