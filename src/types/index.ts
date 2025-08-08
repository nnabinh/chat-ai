export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isEditing?: boolean;
}

export interface Character {
  id: string;
  name: string;
  avatar: string;
  description: string;
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