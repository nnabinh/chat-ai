import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  HeartIcon,
  ChatIcon,
  PhoneIcon,
  MenuIcon,
} from '../../../components/Icons';
import { Character } from '../../../types';

interface ChatHeaderProps {
  currentCharacter?: Character;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ currentCharacter }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
      <View
        style={[styles.headerContent, { paddingTop: insets.top > 0 ? 0 : 12 }]}
      >
        <View style={styles.userInfo}>
          <Image
            source={
              currentCharacter?.avatar ||
              require('../../../../assets/images/anya-avatar.png')
            }
            style={styles.avatar}
          />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>
              {currentCharacter?.name || 'Anya Volkov'}
            </Text>
            <Text style={styles.userStatus}>Online</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton}>
            <PhoneIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MenuIcon />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statsBadge}>
        <View style={styles.statItem}>
          <HeartIcon width={12} height={12} />
          <Text style={styles.statText}>{currentCharacter?.likes || 1200}</Text>
        </View>
        <View style={styles.statItem}>
          <ChatIcon width={12} height={12} />
          <Text style={styles.statText}>
            {currentCharacter?.messages || 34200}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontFamily: 'ABC Favorit Unlicensed Trial',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    color: '#E2E9ED',
    marginBottom: 2,
  },
  userStatus: {
    fontFamily: 'ABC Favorit Unlicensed Trial',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    color: '#8A8A8A',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  actionButton: {
    padding: 8,
  },
  statsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(9, 9, 11, 0.8)',
    borderWidth: 1,
    borderColor: '#373737',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 16,
    marginLeft: 44,
    alignSelf: 'flex-start',
    marginHorizontal: 14,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontFamily: 'ABC Favorit Unlicensed Trial',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: '#C9C9C9',
  },
});
