import { useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Clipboard from 'expo-clipboard';
import {
  deleteMessage,
  editMessage,
  setMessageEditing,
} from '../../chat/chatSlice';

export const useMessageActions = () => {
  const dispatch = useDispatch();
  const [selectedMessage, setSelectedMessage] = useState<{
    id: string;
    text: string;
    isUser: boolean;
  } | null>(null);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [editingText, setEditingText] = useState('');

  const handleLongPress = (message: any) => {
    setSelectedMessage({
      id: message.id,
      text: message.text,
      isUser: message.isUser,
    });
    setShowContextMenu(true);
  };

  const handleCopyMessage = async () => {
    if (selectedMessage) {
      await Clipboard.setStringAsync(selectedMessage.text);
      setShowContextMenu(false);
      setSelectedMessage(null);
      Alert.alert('Copied', 'Message copied to clipboard');
    }
  };

  const handleEditMessage = () => {
    if (selectedMessage && selectedMessage.isUser) {
      setEditingText(selectedMessage.text);
      dispatch(setMessageEditing({ id: selectedMessage.id, isEditing: true }));
      setShowContextMenu(false);
      setSelectedMessage(null);
    }
  };

  const handleSaveEdit = (messageId: string) => {
    if (editingText.trim()) {
      dispatch(
        editMessage({
          id: messageId,
          text: editingText.trim(),
        })
      );
    }
    dispatch(setMessageEditing({ id: messageId, isEditing: false }));
    setEditingText('');
  };

  const handleCancelEdit = (messageId: string) => {
    dispatch(setMessageEditing({ id: messageId, isEditing: false }));
    setEditingText('');
  };

  const handleDeleteMessage = () => {
    if (selectedMessage) {
      Alert.alert(
        'Delete Message',
        'Are you sure you want to delete this message?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
              dispatch(deleteMessage(selectedMessage.id));
              setShowContextMenu(false);
              setSelectedMessage(null);
            },
          },
        ]
      );
    }
  };

  const closeContextMenu = () => {
    setShowContextMenu(false);
    setSelectedMessage(null);
  };

  return {
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
  };
};
