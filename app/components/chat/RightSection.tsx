'use client';

import { Message } from '@/app/data/mockData';
import { useConnectionStore } from '@/app/store/useConnectionStore';
import { User, Phone, Video, MoreVertical, Send, ArrowLeft, UserCircle, Ban, Settings } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import UserProfileSheet from './user-profile-sheet';
import EmojiPicker from 'emoji-picker-react';
import type { EmojiClickData } from 'emoji-picker-react';
import NochatSelectedPlaceholder from '../../../public/assets/selectanypalceholder.jpg'
import EmojiIcon from '../../../public/assets/emoji.png'
import Image from 'next/image';
import { api } from '@/app/api';
import { conversationsApi } from '@/app/api/conversations';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
}

interface RightSectionProps {
  onBack?: () => void;
  showBackButton?: boolean;
  selectedUserId?: string | null;
}

export default function RightSection({ onBack, showBackButton, selectedUserId }: RightSectionProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileSheet, setShowProfileSheet] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchParams = useSearchParams();
  const chatId = searchParams.get('chatId');
  const { selectedConnection } = useConnectionStore();

  // First fetch or create conversation
  const { data: conversation, isLoading: isConversationLoading } = useQuery({
    queryKey: ['conversation', selectedUserId],
    queryFn: async () => {
      if (!selectedUserId) return null;
      try {
        if (chatId) {
          const response = await api.get(`/conversations/${chatId}`);
          return response.data.conversation;
        } else {
          const response = await conversationsApi.createConversation(selectedUserId);
          router.push(`?chatId=${response.data.conversation._id}`);
          return response.data.conversation;
        }
      } catch (err) {
        if (err.response?.status === 404) {
          const response = await conversationsApi.createConversation(selectedUserId);
          router.push(`?chatId=${response.data.conversation._id}`);
          return response.data.conversation;
        }
        throw err;
      }
    },
    enabled: !!selectedUserId,
    retry: false
  });

  // Then fetch messages for the conversation
  const { data: messages = [], isLoading: isMessagesLoading, error } = useQuery({
    queryKey: ['messages', conversation?._id],
    queryFn: async () => {
      if (!conversation?._id) return [];
      try {
        const response = await api.get(`/messages/${conversation._id}`);
        return response.data.messages;
      } catch (err) {
        throw new Error('Failed to fetch messages');
      }
    },
    enabled: !!conversation?._id,
    retry: false
  });

  const [newMessage, setNewMessage] = useState('');

  const { mutate: sendMessage } = useMutation({
    mutationFn: async () => {
      if (!newMessage.trim() || !conversation?._id) return;

      try {
        const response = await api.post('/messages', {
          conversationId: conversation._id,
          text: newMessage
        });
        return response.data.message;
      } catch (err) {
        if (err.response?.status === 403) {
          throw new Error('You do not have permission to send messages in this conversation');
        }
        throw new Error('Failed to send message');
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['messages', conversation?._id],
        (oldData: Message[] = []) => [...oldData, data]
      );
      setNewMessage('');
      queryClient.invalidateQueries(['messages', conversation?._id]);
    },
    onError: (err) => {
      console.error('Error sending message:', err);
      toast.error(err.message || 'Failed to send message');
    }
  });

  const handleSendMessage = () => {
    sendMessage();
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      {selectedUserId && <div className="p-4 border-b border-[var(--muted)] flex justify-between items-center">
        <div className="flex items-center space-x-3">
          {showBackButton && (
            <button onClick={onBack} className="mr-2">
              <ArrowLeft className="w-6 h-6 text-[var(--muted-foreground)]" />
            </button>
          )}
          <div className="p-2 bg-[var(--muted)] rounded-full cursor-pointer">
            <Image
              src={selectedConnection?.user.avatar || "/placeholder.svg"}
              alt={`${selectedConnection?.user.firstName || 'User'} Avatar`}
              width={50}
              height={50}
              className="rounded-full text-[var(--muted-foreground)] w-6 h-6"
              onClick={() => {
                setShowProfileSheet(true);
                setShowDropdown(false);
              }} />



          </div>
          <div className='h-[50px]'>
            <h2 className="font-semibold">
              {selectedConnection ? `${selectedConnection.user.firstName} ${selectedConnection.user.lastName}` : 'Select a chat'}
            </h2>
            <p className="text-sm text-green-500">
              {selectedConnection ? selectedConnection.user.status === 'active' ? 'Active now' : 'Offline' : ''}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Phone className="w-5 h-5 text-[var(--muted-foreground)] cursor-pointer" />
          <Video className="w-5 h-5 text-[var(--muted-foreground)] cursor-pointer" />
          <div className="relative">
            <MoreVertical
              className="w-5 h-5 text-[var(--muted-foreground)] cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-48 bg-[var(--background)] rounded-md shadow-lg py-1 z-50 border border-[var(--muted)]"
              >
                <div className="px-4 py-3 border-b border-[var(--muted)]">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-[var(--muted)] rounded-full">
                      <Image
                        src={users.find(u => u.id === selectedUserId)?.avatar || "/placeholder.svg"}
                        alt="User Avatar"
                        width={50}
                        height={50}
                        className="rounded-full text-[var(--muted-foreground)] w-6 h-6 "
                        onClick={() => {
                          setShowProfileSheet(true);
                          setShowDropdown(false);
                        }}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--foreground)]">
                        {users.find(u => u.id === selectedUserId)?.name}
                      </p>
                      <p className="text-xs text-[var(--muted-foreground)]">
                        {users.find(u => u.id === selectedUserId)?.status === 'active' ? 'Active now' : 'Offline'}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  className="w-full px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--muted)] flex items-center space-x-2"
                  onClick={() => {
                    setShowProfileSheet(true);
                    setShowDropdown(false);
                  }}
                >
                  <UserCircle className="w-4 h-4" />
                  <span>View Profile</span>
                </button>
                <button
                  className="w-full px-4 py-2 text-sm text-red-600 hover:bg-[var(--muted)] flex items-center space-x-2"
                  onClick={() => {
                    // Handle block user
                    setShowDropdown(false);
                  }}
                >
                  <Ban className="w-4 h-4" />
                  <span>Block User</span>
                </button>
                <button
                  className="w-full px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--muted)] flex items-center space-x-2 border-t border-[var(--muted)]"
                  onClick={() => {
                    // Handle chat settings
                    setShowDropdown(false);
                  }}
                >
                  <Settings className="w-4 h-4" />
                  <span>Chat Settings</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>}

      {/* User Profile Sheet */}
      <UserProfileSheet
        isOpen={showProfileSheet}
        onClose={() => setShowProfileSheet(false)}
        userId={selectedUserId || null}
      />

      {/* Chat Messages or Placeholder */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!selectedUserId ? (
          <div className="h-full flex items-center justify-center">
            <img
              src={NochatSelectedPlaceholder.src}
              alt="No chat selected"
              className="max-w-[70%] h-auto opacity-50"
            />
          </div>
        ) : isConversationLoading || isMessagesLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full text-red-500">
            {error instanceof Error ? error.message : 'An error occurred'}
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-2 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}
            >
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <Image
                    src={users.find(u => u.id === selectedUserId)?.avatar || "/placeholder.svg"}
                    alt="User Avatar"
                    width={50}
                    height={50}
                    className="rounded-full text-[var(--muted-foreground)] w-6 h-6 "


                  />
                </div>
              </div>
              <div
                className={`max-w-[70%] p-3 mx-2 relative ${message.sender === 'user'
                  ? 'bg-[var(--primary)] text-white rounded-l-lg rounded-br-lg before:absolute before:right-[-8px] before:top-0 before:border-t-[10px] before:border-r-[10px] before:border-transparent before:border-t-[var(--primary)]'
                  : 'bg-[var(--muted)] text-[var(--foreground)] rounded-r-lg rounded-bl-lg before:absolute before:left-[-8px] before:top-0 before:border-t-[10px] before:border-l-[10px] before:border-transparent before:border-t-[var(--muted)]'
                  }`}
              >
                <p>{message.text}</p>
                <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-[var(--muted)] relative">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] focus:outline-none"
          >
            <Image
              src={EmojiIcon}
              alt="Emoji"
              width={30}
              height={30}
              className=" text-yellow-300 cursor-pointer hover:animate-spin" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 p-4 border border-[var(--muted)] rounded-lg focus:outline-none focus:border-[var(--primary)] bg-[var(--background)] text-[var(--foreground)]"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition-colors w-[500px]"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        {showEmojiPicker && (
          <div className="absolute bottom-full mb-2">
            <EmojiPicker
              onEmojiClick={(emojiData: EmojiClickData) => {
                setNewMessage((prev) => prev + emojiData.emoji);
                setShowEmojiPicker(false);
              }}
              width={300}
              height={400}
            />
          </div>
        )}
      </div>
    </div>
  );
}