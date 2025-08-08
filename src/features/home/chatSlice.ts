import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message, Character, ChatState } from '../../types';

const mockCharacter: Character = {
  id: '1',
  name: 'Anya Volkov',
  avatar: require('@assets/images/anya-avatar.png'),
  background: require('@assets/images/anya-background.png'),
  description:
    'Anya is a mysterious and captivating Russian beauty with piercing blue eyes and platinum blonde hair. Her enigmatic smile hides countless secrets...',
  fullDescription:
    "Anya is a mysterious and captivating Russian beauty with piercing blue eyes and platinum blonde hair. Her enigmatic smile hides countless secrets, and her sultry accent makes every word sound like poetry. Born into aristocracy in Moscow, she fled her privileged life to pursue her own path of adventure and romance. She's intelligent, witty, and dangerously charming - the kind of woman who can steal your heart with a single glance. Behind her confident exterior lies a complex soul who values deep connections and meaningful conversations. She's passionate about art, literature, and the finer things in life, but isn't afraid to get her hands dirty when the situation calls for it. Anya has a magnetic personality that draws people to her, and she uses this gift to navigate the world on her own terms.",
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
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
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
        message.isEdited = true; // Mark message as edited
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
    switchCharacter: (state, action: PayloadAction<Character>) => {
      state.currentCharacter = action.payload;
      // Clear previous messages and add greeting from new character
      state.messages = [
        {
          id: `greeting-${action.payload.id}`,
          text: action.payload.greeting,
          isUser: false,
          timestamp: new Date().toISOString(),
        },
      ];
      state.isTyping = false;
    },
  },
});

export const {
  addMessage,
  deleteMessage,
  editMessage,
  setMessageEditing,
  setTyping,
  switchCharacter,
} = chatSlice.actions;

export default chatSlice.reducer;
