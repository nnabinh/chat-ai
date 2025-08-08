import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

export const useChat = () => {
  const { messages, currentCharacter, isTyping } = useSelector(
    (state: RootState) => state.chat
  );

  return {
    messages,
    currentCharacter,
    isTyping,
  };
};
