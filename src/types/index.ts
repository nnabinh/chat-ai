import { ImageSourcePropType } from 'react-native';

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string; // Changed from Date to string for Redux serialization
  isEditing?: boolean;
  isEdited?: boolean; // Flag to indicate if message has been edited
}

export interface Character {
  id: string;
  name: string;
  avatar: ImageSourcePropType;
  background: ImageSourcePropType;
  description: string;
  fullDescription?: string;
  likes: number;
  messages: number;
  greeting: string;
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
  currentCharacter: Character | null;
}

export interface AppState {
  chat: ChatState;
}
