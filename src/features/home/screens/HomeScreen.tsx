import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Keyboard,
  Pressable,
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  runOnJS,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { switchCharacter } from '../chatSlice';
import { getNextCharacter } from '../api';
import SwipeOverlay from '../../../components/SwipeOverlay';
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

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showSwipeOverlay, setShowSwipeOverlay] = useState(true); // Show on first load
  const [isInChatMode, setIsInChatMode] = useState(false); // Track if user entered chat mode
  const [showChatModeEffect, setShowChatModeEffect] = useState(false); // Visual effect for entering chat mode

  // Custom hooks
  const { messages, currentCharacter, isTyping } = useChat();
  const { isDescriptionExpanded, toggleDescription, resetDescription } =
    useCharacterDescription();

  // Keyboard-aware scrolling with auto-scroll on new messages
  const { scrollViewRef, scrollToBottom } = useKeyboardAwareScrolling({
    isInputFocused,
    dependencies: [messages.length, isTyping], // Auto-scroll when messages change or typing starts
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

  // Swipe overlay handlers
  const handleCloseSwipeOverlay = useCallback(() => {
    setShowSwipeOverlay(false);
    setIsInChatMode(true);
  }, []);

  const handleSwipeToNextCharacter = useCallback(() => {
    const nextCharacter = getNextCharacter(currentCharacter?.id);
    dispatch(switchCharacter(nextCharacter));

    // Reset home screen state when switching characters
    setIsInputFocused(false);
    setIsInChatMode(false);
    setShowChatModeEffect(false);
    resetDescription(); // Reset character description expansion

    // Dismiss keyboard if it's open
    Keyboard.dismiss();
  }, [currentCharacter?.id, dispatch, resetDescription]);

  // TikTok-style swipe gesture handler
  const swipeGestureHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onEnd: (event) => {
        // If swiped up more than 50px, trigger character switch
        if (event.translationY < -50) {
          runOnJS(handleSwipeToNextCharacter)();
        }
      },
    });

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
          {/* Header Shadow - Absolute positioned overlay */}
          <Image
            source={require('@assets/images/header-shadow.png')}
            style={styles.headerShadow}
            resizeMode="stretch"
          />

          {/* Header - Fixed at top */}
          <Pressable onPress={() => Keyboard.dismiss()}>
            <ChatHeader currentCharacter={currentCharacter ?? undefined} />
          </Pressable>

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
              <Pressable onPress={() => Keyboard.dismiss()}>
                <CharacterDescription
                  currentCharacter={currentCharacter ?? undefined}
                  isExpanded={isDescriptionExpanded}
                  onToggle={toggleDescription}
                />
              </Pressable>

              {/* Messages */}
              <Pressable onPress={() => Keyboard.dismiss()}>
                <MessagesList
                  messages={messages}
                  editingText={editingText}
                  setEditingText={setEditingText}
                  onLongPress={handleLongPress}
                  onSaveEdit={handleSaveEdit}
                  onCancelEdit={handleCancelEdit}
                  isTyping={isTyping}
                />
              </Pressable>
            </ScrollView>

            {/* Chat Input - Outside ScrollView but inside KeyboardAvoidingView */}
            <ChatInput
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onSend={handleSendMessage}
            />
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

          {/* Swipe Tutorial Overlay */}
          <SwipeOverlay
            visible={showSwipeOverlay && !isInChatMode}
            onClose={handleCloseSwipeOverlay}
            backgroundImage={currentCharacter?.background}
            autoCloseDelay={500}
          />

          {/* Chat Mode Visual Effect */}
          {showChatModeEffect && (
            <View style={styles.chatModeEffect}>
              <Text style={styles.chatModeText}>
                Now chatting with {currentCharacter?.name}!
              </Text>
            </View>
          )}

          {/* Swipe Zone - TikTok style swipe area (Absolutely positioned) */}
          <PanGestureHandler onGestureEvent={swipeGestureHandler}>
            <Animated.View style={styles.swipeZone} />
          </PanGestureHandler>
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
  headerShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 234,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  swipeZone: {
    position: 'absolute',
    top: 120, // Position after header (adjust based on header height)
    left: 0,
    right: 0,
    width: '100%',
    height: 300,
    backgroundColor: 'transparent',
    zIndex: 100,
  },
  messagesContainer: {
    flex: 1,
  },
  contentWrapper: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  chatModeEffect: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(244, 63, 63, 0.9)',
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginHorizontal: 40,
    borderRadius: 12,
    zIndex: 2000,
  },
  chatModeText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'ABC Favorit Unlicensed Trial',
  },
});

export default HomeScreen;
