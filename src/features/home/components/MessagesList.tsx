import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  TextStyle,
} from 'react-native';
import { Message } from '../../../types';
import TypingIndicator from '@components/TypingIndicator';

interface MessagesListProps {
  messages: Message[];
  editingText: string;
  setEditingText: (text: string) => void;
  onLongPress: (message: Message) => void;
  onSaveEdit: (messageId: string) => void;
  onCancelEdit: (messageId: string) => void;
  isTyping?: boolean;
}

export const MessagesList: React.FC<MessagesListProps> = ({
  messages,
  editingText,
  setEditingText,
  onLongPress,
  onSaveEdit,
  onCancelEdit,
  isTyping = false,
}) => {
  const renderMarkdownText = (
    text: string,
    baseStyle: TextStyle | TextStyle[]
  ) => {
    // Split text by markdown patterns while preserving delimiters
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);

    return (
      <Text style={baseStyle}>
        {parts.map((part, index) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            // Bold text - keep ** and apply bold style
            return (
              <Text key={index} style={[baseStyle, styles.boldText]}>
                {part}
              </Text>
            );
          } else if (part.startsWith('*') && part.endsWith('*')) {
            // Italic text - keep * and apply italic style
            return (
              <Text key={index} style={[baseStyle, styles.italicText]}>
                {part}
              </Text>
            );
          } else {
            // Regular text
            return part;
          }
        })}
      </Text>
    );
  };

  return (
    <View style={styles.messagesWrapper}>
      {messages.map((message, index) => (
        <View
          key={message.id || index}
          style={[message.isUser ? styles.userMessage : styles.aiMessage]}
        >
          <TouchableOpacity
            style={[
              styles.messageBubble,
              message.isUser ? styles.userBubble : styles.aiBubble,
            ]}
            onLongPress={() => onLongPress(message)}
            delayLongPress={500}
            activeOpacity={0.8}
            disabled={message.isEditing}
          >
            {message.isEditing ? (
              <View style={styles.editingContainer}>
                <TextInput
                  style={[
                    styles.editInput,
                    message.isUser ? styles.userText : styles.aiText,
                  ]}
                  value={editingText}
                  onChangeText={setEditingText}
                  multiline
                  autoFocus
                  onSubmitEditing={() => onSaveEdit(message.id)}
                />
                <View style={styles.editActions}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => onCancelEdit(message.id)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.editButton, styles.saveButton]}
                    onPress={() => onSaveEdit(message.id)}
                  >
                    <Text style={styles.saveButtonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <>
                {message.isUser ? (
                  <Text style={[styles.messageText, styles.userText]}>
                    {message.text}
                  </Text>
                ) : (
                  renderMarkdownText(message.text, [
                    styles.messageText,
                    styles.aiText,
                  ])
                )}
              </>
            )}
          </TouchableOpacity>
          {/* Show "edited" indicator for edited user messages */}
          {message.isUser && message.isEdited && (
            <Text style={styles.editedIndicator}>edited</Text>
          )}
        </View>
      ))}
      {isTyping && <TypingIndicator style={styles.typingIndicator} />}
    </View>
  );
};

const styles = StyleSheet.create({
  messagesWrapper: {
    paddingHorizontal: 14,
    gap: 8,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  aiMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userBubble: {
    backgroundColor: '#F43F3F',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  aiBubble: {
    backgroundColor: 'rgba(214, 214, 220, 0.9)',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  messageText: {
    fontFamily: 'ABC Favorit Unlicensed Trial',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#FFFFFF',
  },
  aiText: {
    color: '#09090B',
  },
  boldText: {
    fontWeight: '600',
    color: '#09090B',
  },
  italicText: {
    fontStyle: 'italic',
    color: '#6B6B6B',
  },
  editingContainer: {
    minWidth: 200,
  },
  editInput: {
    fontFamily: 'ABC Favorit Unlicensed Trial',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 22,
    borderWidth: 1,
    borderColor: '#373737',
    borderRadius: 8,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    minHeight: 40,
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 8,
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#373737',
  },
  saveButton: {
    backgroundColor: '#F43F3F',
    borderColor: '#F43F3F',
  },
  cancelButtonText: {
    color: '#C9C9C9',
    fontSize: 12,
    fontWeight: '500',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  editedIndicator: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.5)',
    fontStyle: 'italic',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  typingIndicator: {
    marginLeft: 0,
  },
});
