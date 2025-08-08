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
import { addMessage, setTyping } from '../store/chatSlice';
import { useSendMessageMutation } from '../store/api';
import { SendIcon } from './Icons';

const ChatInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const [sendMessage] = useSendMessageMutation();

  const handleSend = async () => {
    if (message.trim()) {
      const userMessage = {
        text: message.trim(),
        isUser: true,
        timestamp: new Date(),
      };

      // Add user message
      dispatch(addMessage(userMessage));
      const currentMessage = message.trim();
      setMessage('');
      Keyboard.dismiss();

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
      <BlurView intensity={60} style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={setMessage}
          placeholder="Write a message"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          onPress={handleSend}
          style={[
            styles.sendButton,
            { opacity: message.trim() ? 1 : 0.5 },
          ]}
          disabled={!message.trim()}
        >
          <SendIcon />
        </TouchableOpacity>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 76, // Above the tab bar
    left: 14,
    right: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(110, 110, 110, 0.6)',
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
    maxHeight: 100,
  },
  sendButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});

export default ChatInput;