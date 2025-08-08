import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HeartIcon, ChatIcon, PhoneIcon, MenuIcon } from '@components/Icons';
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
              require('@assets/images/anya-avatar.png')
            }
            style={styles.avatar}
          />
          <View style={styles.userDetails}>
            <Text
              style={styles.userName}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
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
    paddingTop: 0, // Will be set dynamically with safe area
    paddingHorizontal: 0,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingBottom: 0,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 20, // Increased margin for more space
    maxWidth: '70%', // Prevent taking too much space
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
    minWidth: 0, // Allows text to truncate if needed
    justifyContent: 'center', // Vertically center the text content
  },
  userName: {
    fontFamily: 'ABC Favorit Unlicensed Trial',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    color: '#E2E9ED',
    marginBottom: 1, // Reduced margin for better centering
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
    gap: 12, // Reduced gap to save space
    flexShrink: 0, // Prevent shrinking
    minWidth: 80, // Ensure minimum space for buttons
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
    marginLeft: 58, // Avatar width (44) + margin (12) + padding (2)
    marginHorizontal: 14,
    marginTop: 0,
    marginBottom: 8, // 8px spacing before ScrollView
    alignSelf: 'flex-start',
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
