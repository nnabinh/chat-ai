import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Character } from '../../../types';

interface CharacterDescriptionProps {
  currentCharacter?: Character;
  isExpanded: boolean;
  onToggle: () => void;
}

export const CharacterDescription: React.FC<CharacterDescriptionProps> = ({
  currentCharacter,
  isExpanded,
  onToggle,
}) => {
  return (
    <View style={styles.descriptionContainer}>
      <Text style={styles.descriptionText}>
        {isExpanded
          ? currentCharacter?.fullDescription ||
            currentCharacter?.description ||
            "Anya is a mysterious and captivating Russian beauty with piercing blue eyes and platinum blonde hair. Her enigmatic smile hides countless secrets, and her sultry accent makes every word sound like poetry. Born into aristocracy in Moscow, she fled her privileged life to pursue her own path of adventure and romance. She's intelligent, witty, and dangerously charming - the kind of woman who can steal your heart with a single glance. Behind her confident exterior lies a complex soul who values deep connections and meaningful conversations."
          : currentCharacter?.description ||
            'Anya is a mysterious and captivating Russian beauty with piercing blue eyes and platinum blonde hair. Her enigmatic smile hides countless secrets...'}
        {!isExpanded && (
          <Text onPress={onToggle} style={styles.readMoreText}>
            {' Read More'}
          </Text>
        )}
      </Text>
      {isExpanded && (
        <TouchableOpacity onPress={onToggle} style={styles.readMoreButton}>
          <Text style={styles.readMoreText}>Read Less</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  descriptionContainer: {
    marginHorizontal: 14,
    marginBottom: 20,
    backgroundColor: 'rgba(9, 9, 11, 0.8)',
    borderWidth: 1,
    borderColor: '#373737',
    borderRadius: 12,
    padding: 16,
  },
  descriptionText: {
    fontFamily: 'ABC Favorit Unlicensed Trial',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 22,
    color: '#C9C9C9',
  },
  readMoreButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  readMoreText: {
    fontFamily: 'ABC Favorit Unlicensed Trial',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 22,
    color: '#C9C9C9',
    textDecorationLine: 'underline',
  },
});
