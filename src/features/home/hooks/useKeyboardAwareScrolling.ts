import { useRef, useCallback, useEffect } from 'react';
import { ScrollView, Keyboard } from 'react-native';

interface UseKeyboardAwareScrollingProps {
  isInputFocused?: boolean;
  dependencies?: unknown[]; // Additional dependencies to trigger scroll (like messages length, typing state)
}

export const useKeyboardAwareScrolling = ({
  isInputFocused = false,
  dependencies = [],
}: UseKeyboardAwareScrollingProps = {}) => {
  const scrollViewRef = useRef<ScrollView>(null);

  // Scroll to bottom helper function
  const scrollToBottom = useCallback(
    (animated: boolean = true, delay: number = 100) => {
      if (scrollViewRef.current) {
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated });
        }, delay);
      }
    },
    []
  );

  // Handle keyboard show/hide events for better scroll behavior
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        // Scroll to bottom when keyboard appears, especially if input is focused
        if (isInputFocused) {
          scrollToBottom(true, 150); // Small delay to let keyboard animation settle
        }
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        // Optional: could add behavior when keyboard hides if needed
      }
    );

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, [isInputFocused, scrollToBottom]);

  // Auto-scroll when dependencies change (like messages or typing indicator)
  useEffect(() => {
    if (dependencies.some((dep) => dep !== undefined)) {
      // Use multiple timeouts to ensure scrolling works even with delayed UI updates
      setTimeout(() => scrollToBottom(true, 0), 50);
      setTimeout(() => scrollToBottom(true, 0), 200);
    }
  }, [scrollToBottom, dependencies]);

  return {
    scrollViewRef,
    scrollToBottom,
  };
};
