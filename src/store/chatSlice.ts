import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message, Character, ChatState } from '../types';

const mockCharacter: Character = {
  id: '1',
  name: 'Anya Volkov',
  avatar: require('../../assets/images/avatar.jpg'),
  description:
    "Shin Lewis is a quiet, introverted soul who'd rather stay in his cozy apartment with his sketches than deal with the outside world. He's the type... Read More",
  likes: 1200,
  messages: 34200,
  greeting:
    'Hmm *Looks at you and speaks with a Russian accent* Do you think this smells good?',
};

const initialMessages: Message[] = [
  {
    id: '1',
    text: mockCharacter.greeting,
    isUser: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
];

const initialState: ChatState = {
  messages: initialMessages,
  isTyping: false,
  currentCharacter: mockCharacter,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Omit<Message, 'id'>>) => {
      const newMessage: Message = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.messages.push(newMessage);
    },
    deleteMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(
        (message) => message.id !== action.payload
      );
    },
    editMessage: (
      state,
      action: PayloadAction<{ id: string; text: string }>
    ) => {
      const message = state.messages.find(
        (msg) => msg.id === action.payload.id
      );
      if (message) {
        message.text = action.payload.text;
        message.isEditing = false;
      }
    },
    setMessageEditing: (
      state,
      action: PayloadAction<{ id: string; isEditing: boolean }>
    ) => {
      const message = state.messages.find(
        (msg) => msg.id === action.payload.id
      );
      if (message) {
        message.isEditing = action.payload.isEditing;
      }
    },
    setTyping: (state, action: PayloadAction<boolean>) => {
      state.isTyping = action.payload;
    },
  },
});

export const {
  addMessage,
  deleteMessage,
  editMessage,
  setMessageEditing,
  setTyping,
} = chatSlice.actions;

export default chatSlice.reducer;