import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { BlurView } from 'expo-blur';
import * as Clipboard from 'expo-clipboard';
import { useDispatch } from 'react-redux';
import { deleteMessage, editMessage, setMessageEditing } from '../chatSlice';
import { Message } from '../../../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const dispatch = useDispatch();
  const [editText, setEditText] = useState(message.text);
  const [showActions, setShowActions] = useState(false);

  const handleLongPress = () => {
    if (!message.isUser) return; // Only allow actions on user messages
    setShowActions(true);
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(message.text);
    setShowActions(false);
    Alert.alert('Copied', 'Message copied to clipboard');
  };

  const handleEdit = () => {
    dispatch(setMessageEditing({ id: message.id, isEditing: true }));
    setShowActions(false);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Message',
      'Are you sure you want to delete this message?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteMessage(message.id));
            setShowActions(false);
          },
        },
      ]
    );
  };

  const handleSaveEdit = () => {
    dispatch(editMessage({ id: message.id, text: editText }));
  };

  const handleCancelEdit = () => {
    setEditText(message.text);
    dispatch(setMessageEditing({ id: message.id, isEditing: false }));
  };

  if (message.isEditing) {
    return (
      <View style={[styles.container, styles.userContainer]}>
        <BlurView intensity={80} style={styles.editBubble}>
          <TextInput
            style={styles.editInput}
            value={editText}
            onChangeText={setEditText}
            multiline
            autoFocus
          />
          <View style={styles.editActions}>
            <TouchableOpacity
              onPress={handleCancelEdit}
              style={styles.editButton}
            >
              <Text style={styles.editButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSaveEdit}
              style={styles.editButton}
            >
              <Text style={styles.editButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        message.isUser ? styles.userContainer : styles.aiContainer,
      ]}
    >
      <Pressable
        onLongPress={handleLongPress}
        delayLongPress={500}
        style={[
          styles.bubble,
          message.isUser ? styles.userBubble : styles.aiBubble,
        ]}
      >
        <Text
          style={[
            styles.text,
            message.isUser ? styles.userText : styles.aiText,
          ]}
        >
          {message.text}
        </Text>
      </Pressable>

      {showActions && (
        <BlurView intensity={80} style={styles.actionsContainer}>
          <TouchableOpacity onPress={handleCopy} style={styles.actionButton}>
            <Text style={styles.actionText}>Copy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEdit} style={styles.actionButton}>
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
            <Text style={[styles.actionText, styles.deleteText]}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowActions(false)}
            style={styles.actionButton}
          >
            <Text style={styles.actionText}>Cancel</Text>
          </TouchableOpacity>
        </BlurView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    paddingHorizontal: 14,
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  aiContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    padding: 16,
    borderRadius: 12,
  },
  userBubble: {
    backgroundColor: 'rgba(110, 110, 110, 0.6)',
    borderTopRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#D6D6DC',
    borderTopLeftRadius: 4,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#FFFFFF',
  },
  aiText: {
    color: '#09090B',
  },
  actionsContainer: {
    position: 'absolute',
    top: 0,
    right: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 8,
    padding: 8,
    marginTop: 40,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  deleteText: {
    color: '#FF6B6B',
  },
  editBubble: {
    maxWidth: '80%',
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(110, 110, 110, 0.6)',
  },
  editInput: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 22,
    minHeight: 44,
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  editButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 6,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default MessageBubble;
