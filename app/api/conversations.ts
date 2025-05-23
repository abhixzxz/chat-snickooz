import { api } from '.';

export const conversationsApi = {
  // Create a new conversation
  createConversation: async (participantId: string) => {
    const response = await api.post('/conversations', { participantId });
    return response;
  },

  // Get all conversations for the current user
  getConversations: async () => {
    const response = await api.get('/conversations');
    return response;
  },

  // Get a specific conversation by ID
  getConversation: async (conversationId: string) => {
    const response = await api.get(`/conversations/${conversationId}`);
    return response;
  },

  // Update a conversation
  updateConversation: async (conversationId: string, data: any) => {
    const response = await api.patch(`/conversations/${conversationId}`, data);
    return response;
  },

  // Add participants to a conversation
  addParticipants: async (conversationId: string, participantIds: string[]) => {
    const response = await api.post(`/conversations/${conversationId}/participants`, { participantIds });
    return response;
  },

  // Remove a participant from a conversation
  removeParticipant: async (conversationId: string, participantId: string) => {
    const response = await api.delete(`/conversations/${conversationId}/participants/${participantId}`);
    return response;
  }
};