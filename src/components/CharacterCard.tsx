import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Character } from '../types';
import { HeartIcon, ChatIcon } from './Icons';

interface CharacterCardProps {
  character: Character;
  onPress: () => void;
}

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = screenWidth;

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* Background Image */}
      <Image
        source={character.avatar}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Gradient Overlays */}
      <LinearGradient
        colors={['#09090B', 'rgba(9, 9, 11, 0)']}
        style={styles.topGradient}
      />
      <LinearGradient
        colors={['rgba(9, 9, 11, 0)', '#09090B']}
        style={styles.bottomGradient}
      />

      {/* Content */}
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.characterInfo}>
            <Image source={character.avatar} style={styles.avatar} />
            <Text style={styles.characterName}>{character.name}</Text>
          </View>

          {/* Stats */}
          <BlurView intensity={60} style={styles.statsContainer}>
            <View style={styles.stat}>
              <HeartIcon />
              <Text style={styles.statText}>
                {character.likes > 1000
                  ? `${(character.likes / 1000).toFixed(1)}k`
                  : character.likes}
              </Text>
            </View>
            <View style={styles.stat}>
              <ChatIcon />
              <Text style={styles.statText}>
                {character.messages > 1000
                  ? `${(character.messages / 1000).toFixed(1)}k`
                  : character.messages}
              </Text>
            </View>
          </BlurView>
        </View>

        {/* Description */}
        <BlurView intensity={80} style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{character.description}</Text>
        </BlurView>

        {/* Greeting */}
        <View style={styles.greetingContainer}>
          <BlurView intensity={80} style={styles.greetingBubble}>
            <Text style={styles.greetingText}>{character.greeting}</Text>
          </BlurView>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    height: 822, // Full screen height as per design
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    width: '105%',
    height: '101%',
    left: -9,
    top: 0,
  },
  topGradient: {
    position: 'absolute',
    width: '100%',
    height: 234,
    top: 0,
  },
  bottomGradient: {
    position: 'absolute',
    width: '100%',
    height: 271,
    bottom: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 60,
  },
  header: {
    marginBottom: 12,
  },
  characterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  characterName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '400',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 99,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    marginLeft: 44,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  statText: {
    color: '#EBEBEB',
    fontSize: 12,
    marginLeft: 4,
  },
  descriptionContainer: {
    backgroundColor: 'rgba(9, 9, 11, 0.8)',
    borderWidth: 1,
    borderColor: '#373737',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  descriptionText: {
    color: '#C9C9C9',
    fontSize: 16,
    lineHeight: 22,
  },
  greetingContainer: {
    position: 'absolute',
    bottom: 140,
    left: 14,
    right: 14,
  },
  greetingBubble: {
    backgroundColor: '#D6D6DC',
    borderRadius: 12,
    borderTopLeftRadius: 0,
    padding: 16,
  },
  greetingText: {
    color: '#09090B',
    fontSize: 16,
    lineHeight: 22,
  },
});

export default CharacterCard;
