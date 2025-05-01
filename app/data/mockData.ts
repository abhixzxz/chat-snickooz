export interface User {
  id: number;
  name: string;
  status: 'active' | 'inactive';
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: string;
}

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'other';
  timestamp: string;
}

export interface Conversation {
  id: number;
  userId: number;
  messages: Message[];
}

export const users: User[] = [
  {
    id: 1,
    name: 'Abhi',
    status: 'active',
    lastMessage: 'Hey, how are you?',
    lastMessageTime: '10:30 AM'
  },
  {
    id: 2,
    name: 'Aniil',
    status: 'active',
    lastMessage: 'The project looks great!',
    lastMessageTime: '9:45 AM'
  },
  {
    id: 3,
    name: 'Vasu',
    status: 'inactive',
    lastMessage: 'See you tomorrow',
    lastMessageTime: 'Yesterday'
  },
  {
    id: 4,
    name: 'jonyyy',
    status: 'active',
    lastMessage: 'Thanks for your help',
    lastMessageTime: '2:15 PM'
  },
  {
    id: 5,
    name: 'Micheee',
    status: 'inactive',
    lastMessage: 'Meeting at 3 PM',
    lastMessageTime: 'Yesterday'
  }
];

export const conversations: Conversation[] = [
  {
    id: 1,
    userId: 1,
    messages: [
      { id: 1, text: 'Hey, how are you?', sender: 'other', timestamp: '10:30 AM' },
      { id: 2, text: 'I\'m good, thanks! How about you?', sender: 'user', timestamp: '10:31 AM' },
      { id: 3, text: 'Pretty good! Working on the new project', sender: 'other', timestamp: '10:32 AM' }
    ]
  },
  {
    id: 2,
    userId: 2,
    messages: [
      { id: 1, text: 'The project looks great!', sender: 'other', timestamp: '9:45 AM' },
      { id: 2, text: 'Thank you! We worked hard on it', sender: 'user', timestamp: '9:47 AM' }
    ]
  },
  {
    id: 3,
    userId: 3,
    messages: [
      { id: 1, text: 'Are we meeting tomorrow?', sender: 'user', timestamp: '3:20 PM' },
      { id: 2, text: 'Yes, at 10 AM', sender: 'other', timestamp: '3:22 PM' },
      { id: 3, text: 'See you tomorrow', sender: 'other', timestamp: '3:23 PM' }
    ]
  },
  {
    id: 4,
    userId: 4,
    messages: [
      { id: 1, text: 'Can you help me with the code?', sender: 'other', timestamp: '2:10 PM' },
      { id: 2, text: 'Sure, what do you need?', sender: 'user', timestamp: '2:12 PM' },
      { id: 3, text: 'Thanks for your help', sender: 'other', timestamp: '2:15 PM' }
    ]
  },
  {
    id: 5,
    userId: 5,
    messages: [
      { id: 1, text: 'Team meeting tomorrow', sender: 'other', timestamp: '11:00 AM' },
      { id: 2, text: 'Meeting at 3 PM', sender: 'other', timestamp: '11:05 AM' },
      { id: 3, text: 'I\'ll be there', sender: 'user', timestamp: '11:10 AM' }
    ]
  }
];