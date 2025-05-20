import { create } from 'zustand';
import { User } from '../api/auth';
import { connectionsApi } from '../api/connections';

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

interface ConnectionState {
  connections: Connection[];
  loading: boolean;
  error: string | null;
  selectedConnection: Connection | null;
  fetchConnections: () => Promise<void>;
  createConnection: (recipientId: string) => Promise<Connection>;
  updateConnectionStatus: (connectionId: string, status: 'accepted' | 'rejected') => Promise<void>;
  setSelectedConnection: (connection: Connection | null) => void;
}

export const useConnectionStore = create<ConnectionState>((set, get) => ({
  connections: [],
  loading: false,
  error: null,
  selectedConnection: null,

  fetchConnections: async () => {
    try {
      set({ loading: true, error: null });
      const response = await connectionsApi.getUserConnections();
      set({ connections: response.data?.connections || [] });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch connections' });
      set({ connections: [] });
    } finally {
      set({ loading: false });
    }
  },

  createConnection: async (recipientId: string) => {
    try {
      set({ loading: true, error: null });
      const response = await connectionsApi.createConnection(recipientId);
      // Refresh connections list after creating new connection
      await get().fetchConnections();
      return response.connection; // Return only the connection object
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to create connection' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateConnectionStatus: async (connectionId: string, status: 'accepted' | 'rejected') => {
    try {
      set({ loading: true, error: null });
      await connectionsApi.updateConnectionStatus(connectionId, status);
      // Refresh connections list after updating status
      await get().fetchConnections();
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update connection status' });
    } finally {
      set({ loading: false });
    }
  },

  setSelectedConnection: (connection: Connection | null) => {
    set({ selectedConnection: connection });
  }
}));