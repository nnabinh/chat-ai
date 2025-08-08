import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { useDispatch } from 'react-redux';
import { addMessage, setTyping } from '../chatSlice';
import { useSendMessageMutation } from '../api';
import { SendIcon } from '@components/Icons';

interface ChatInputProps {
  onFocus?: () => void;
  onBlur?: () => void;
  onSend?: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onFocus, onBlur, onSend }) => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const [sendMessage] = useSendMessageMutation();

  const handleSend = async () => {
    if (message.trim()) {
      const userMessage = {
        text: message.trim(),
        isUser: true,
        timestamp: new Date().toISOString(),
      };

      // Add user message
      dispatch(addMessage(userMessage));
      const currentMessage = message.trim();
      setMessage('');
      Keyboard.dismiss();

      // Trigger scroll to bottom
      onSend?.();

      // Show typing indicator
      dispatch(setTyping(true));

      try {
        // Send message to API and get response
        const response = await sendMessage({
          message: currentMessage,
          characterId: '1',
        }).unwrap();

        // Hide typing indicator
        dispatch(setTyping(false));

        // Add AI response
        dispatch(
          addMessage({
            text: response.text,
            isUser: false,
            timestamp: response.timestamp,
          })
        );
      } catch (error) {
        // Hide typing indicator on error
        dispatch(setTyping(false));
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={setMessage}
          placeholder="Write a message"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          multiline
          maxLength={500}
          scrollEnabled={true}
          textAlignVertical="top"
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <TouchableOpacity
          onPress={handleSend}
          style={[styles.sendButton, { opacity: message.trim() ? 1 : 0.5 }]}
          disabled={!message.trim()}
        >
          <SendIcon width={16} height={16} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    paddingVertical: 12, // Vertical padding for proper spacing
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6E6E6E99',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 48,
  },
  textInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 22,
    paddingBottom: 6,
    maxHeight: 88, // Approximately 4 lines (22 * 4)
  },
  sendButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(70, 70, 70, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    padding: 4,
  },
});

export default ChatInput;
