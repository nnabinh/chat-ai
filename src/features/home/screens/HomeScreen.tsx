import React, { useRef } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useChat, useMessageActions, useCharacterDescription } from '../hooks';
import {
  ChatHeader,
  CharacterDescription,
  MessagesList,
  MessageContextMenu,
} from '../components';
import ChatInput from '../../chat/components/ChatInput';

// Constants for layout calculations
const TAB_BAR_HEIGHT = 56;
const CHAT_INPUT_HEIGHT = 48;
const CHAT_INPUT_MARGIN = 14;

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
  
  // Custom hooks
  const { messages, currentCharacter } = useChat();
  const { isDescriptionExpanded, toggleDescription } = useCharacterDescription();
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

  return (
    <View style={styles.container}>
      <ImageBackground
        source={currentCharacter?.background || require('../../../../assets/images/anya-background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)']}
          style={styles.gradient}
        >
          {/* Header */}
          <ChatHeader currentCharacter={currentCharacter} />

          {/* Messages Container */}
          <KeyboardAwareScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={[
              styles.messagesContent,
              {
                paddingBottom:
                  TAB_BAR_HEIGHT +
                  CHAT_INPUT_HEIGHT +
                  CHAT_INPUT_MARGIN +
                  insets.bottom +
                  20,
              },
            ]}
            showsVerticalScrollIndicator={false}
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            keyboardOpeningTime={250}
            extraScrollHeight={20}
            keyboardShouldPersistTaps="handled"
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
          </KeyboardAwareScrollView>

          {/* Chat Input */}
          <ChatInput />

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
  messagesContainer: {
    flex: 1,
    marginTop: 120,
    width: '100%',
  },
  messagesContent: {
    flexGrow: 1,
    width: '100%',
  },
});

export default HomeScreen;