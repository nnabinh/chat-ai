import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HeartIcon, ChatIcon, PhoneIcon, MenuIcon } from '@components/Icons';
import { formatNumber } from '@utils';
import { Character } from '../../../types';

interface ChatHeaderProps {
  currentCharacter?: Character;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ currentCharacter }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top || 12 }}>
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
          <Text style={styles.statText}>
            {formatNumber(currentCharacter?.likes || 1200)}
          </Text>
        </View>
        <View style={styles.statItem}>
          <ChatIcon width={12} height={12} />
          <Text style={styles.statText}>
            {formatNumber(currentCharacter?.messages || 34200)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 37,
  },
  userDetails: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  userName: {
    fontFamily: 'ABC Favorit Unlicensed Trial',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 25,
    color: '#FFFFFF',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    backgroundColor: 'rgba(110, 110, 110, 0.6)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
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
    gap: 8,
    marginLeft: 54,
    marginHorizontal: 14,
    marginBottom: 8,
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
