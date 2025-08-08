import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  useChat,
  useMessageActions,
  useCharacterDescription,
  useKeyboardAwareScrolling,
} from '../hooks';
import {
  ChatHeader,
  CharacterDescription,
  MessagesList,
  MessageContextMenu,
  ChatInput,
} from '../components';

// Constants for layout calculations
const TAB_BAR_HEIGHT = 56;
const CHAT_INPUT_HEIGHT = 48;
const CHAT_INPUT_MARGIN = 14;

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Custom hooks
  const { messages, currentCharacter } = useChat();
  const { isDescriptionExpanded, toggleDescription } =
    useCharacterDescription();

  // Keyboard-aware scrolling with auto-scroll on new messages
  const { scrollViewRef, scrollToBottom } = useKeyboardAwareScrolling({
    isInputFocused,
    dependencies: [messages.length], // Auto-scroll when messages change
  });
  const {
    selectedMessage,
    showContextMenu,
    editingText,
    setEditingText,
    handleLongPress,
    handleCopyMessage,
    handleEditMessage,
    handleSaveEdit,
    handleCancelEdit,
    handleDeleteMessage,
    closeContextMenu,
  } = useMessageActions();

  // Input focus handlers
  const handleInputFocus = useCallback(() => {
    setIsInputFocused(true);
    // Scroll to bottom when input is focused, with delay for keyboard animation
    scrollToBottom(true, 200);
  }, [scrollToBottom]);

  const handleInputBlur = useCallback(() => {
    setIsInputFocused(false);
  }, []);

  const handleSendMessage = useCallback(() => {
    // Scroll to bottom after sending message
    setTimeout(() => {
      scrollToBottom(true, 0);
    }, 50);
    // Additional scroll to ensure we're at bottom after UI updates
    setTimeout(() => {
      scrollToBottom(true, 0);
    }, 200);
  }, [scrollToBottom]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={
          currentCharacter?.background ||
          require('@assets/images/anya-background.png')
        }
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)']}
          style={[
            styles.gradient,
            { paddingBottom: TAB_BAR_HEIGHT + insets.bottom },
          ]}
        >
          {/* Header - Fixed at top */}
          <ChatHeader currentCharacter={currentCharacter} />

          {/* Keyboard Avoiding Content */}
          <KeyboardAvoidingView
            style={styles.keyboardAvoidingContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
          >
            {/* Scrollable Messages Content */}
            <ScrollView
              ref={scrollViewRef}
              style={styles.messagesContainer}
              contentContainerStyle={styles.contentWrapper}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="interactive"
            >
              {/* Character Description */}
              <CharacterDescription
                currentCharacter={currentCharacter}
                isExpanded={isDescriptionExpanded}
                onToggle={toggleDescription}
              />

              {/* Messages */}
              <MessagesList
                messages={messages}
                editingText={editingText}
                setEditingText={setEditingText}
                onLongPress={handleLongPress}
                onSaveEdit={handleSaveEdit}
                onCancelEdit={handleCancelEdit}
              />
            </ScrollView>

            {/* Chat Input - Outside ScrollView but inside KeyboardAvoidingView */}
            <View
              style={[
                styles.chatInputContainer,
                { paddingBottom: insets.bottom },
              ]}
            >
              <ChatInput
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onSend={handleSendMessage}
              />
            </View>
          </KeyboardAvoidingView>

          {/* Context Menu */}
          <MessageContextMenu
            visible={showContextMenu}
            selectedMessage={selectedMessage}
            onClose={closeContextMenu}
            onCopy={handleCopyMessage}
            onEdit={handleEditMessage}
            onDelete={handleDeleteMessage}
          />
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  contentWrapper: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  chatInputContainer: {
    backgroundColor: 'transparent',
  },
});

export default HomeScreen;
