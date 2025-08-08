import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface MessageContextMenuProps {
  visible: boolean;
  selectedMessage: {
    id: string;
    text: string;
    isUser: boolean;
  } | null;
  onClose: () => void;
  onCopy: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const MessageContextMenu: React.FC<MessageContextMenuProps> = ({
  visible,
  selectedMessage,
  onClose,
  onCopy,
  onEdit,
  onDelete,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.contextMenu}>
          <TouchableOpacity style={styles.contextMenuItem} onPress={onCopy}>
            <Text style={styles.contextMenuText}>Copy</Text>
          </TouchableOpacity>

          {selectedMessage?.isUser && (
            <TouchableOpacity style={styles.contextMenuItem} onPress={onEdit}>
              <Text style={styles.contextMenuText}>Edit</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.contextMenuItem, styles.deleteItem]}
            onPress={onDelete}
          >
            <Text style={[styles.contextMenuText, styles.deleteText]}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contextMenu: {
    backgroundColor: 'rgba(40, 40, 40, 0.95)',
    borderRadius: 12,
    paddingVertical: 8,
    minWidth: 150,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  contextMenuItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  contextMenuText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  deleteItem: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  deleteText: {
    color: '#FF6B6B',
  },
});
