import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Message } from '../../../types';

interface MessagesListProps {
  messages: Message[];
  editingText: string;
  setEditingText: (text: string) => void;
  onLongPress: (message: Message) => void;
  onSaveEdit: (messageId: string) => void;
  onCancelEdit: (messageId: string) => void;
}

export const MessagesList: React.FC<MessagesListProps> = ({
  messages,
  editingText,
  setEditingText,
  onLongPress,
  onSaveEdit,
  onCancelEdit,
}) => {
  const renderMarkdownText = (text: string, baseStyle: any) => {
    // Split text by markdown patterns while preserving delimiters
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);

    return (
      <Text style={baseStyle}>
        {parts.map((part, index) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            // Bold text - remove ** and apply bold style
            const boldText = part.slice(2, -2);
            return (
              <Text key={index} style={[baseStyle, styles.boldText]}>
                {boldText}
              </Text>
            );
          } else if (part.startsWith('*') && part.endsWith('*')) {
            // Italic text - remove * and apply italic style
            const italicText = part.slice(1, -1);
            return (
              <Text key={index} style={[baseStyle, styles.italicText]}>
                {italicText}
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
          style={[
            styles.messageContainer,
            message.isUser ? styles.userMessage : styles.aiMessage,
          ]}
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
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  messagesWrapper: {
    flex: 1,
    paddingHorizontal: 14,
  },
  messageContainer: {
    marginBottom: 16,
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
});
