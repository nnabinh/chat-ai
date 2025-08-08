import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  ImageSourcePropType,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SwipeUpIcon, CloseIcon } from './Icons';

interface SwipeOverlayProps {
  visible: boolean;
  onClose: () => void;
  backgroundImage?: ImageSourcePropType;
  autoCloseDelay?: number;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SwipeOverlay: React.FC<SwipeOverlayProps> = ({
  visible,
  onClose,
  backgroundImage,
  autoCloseDelay = 500,
}) => {
  const onCloseRef = useRef(onClose);

  // Keep the ref updated
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Auto-close overlay completely after delay
  useEffect(() => {
    if (visible && autoCloseDelay > 0) {
      const timer = setTimeout(() => {
        onCloseRef.current();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [visible, autoCloseDelay]);

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      {/* Background with blur effect */}
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}
        blurRadius={9}
      >
        {/* Top gradient */}
        <LinearGradient
          colors={['#09090B', 'rgba(9, 9, 11, 0)']}
          style={styles.topGradient}
        />

        {/* Bottom gradient */}
        <LinearGradient
          colors={['rgba(9, 9, 11, 0)', '#09090B']}
          style={styles.bottomGradient}
        />
      </ImageBackground>

      {/* Dark overlay */}
      <View style={styles.darkOverlay} />

      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <CloseIcon width={18} height={18} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Central Swipe Indicator */}
      <View style={styles.swipeContainer}>
        <View style={styles.swipeIndicator}>
          <SwipeUpIcon width={24} height={24} color="#FFFFFF" />
        </View>
      </View>

      {/* Text */}
      <Text style={styles.swipeText}>Swipe to move{'\n'}to the next chat</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    left: 0,
    top: 0,
    zIndex: 1000,
  },
  backgroundImage: {
    position: 'absolute',
    width: screenWidth + 18, // Slightly wider as per CSS
    height: screenHeight,
    left: -9,
    top: 0,
  },
  topGradient: {
    position: 'absolute',
    width: screenWidth,
    height: 234,
    left: 9,
    top: 0,
  },
  bottomGradient: {
    position: 'absolute',
    width: screenWidth,
    height: 271,
    left: 9,
    top: screenHeight - 271,
  },
  darkOverlay: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  closeButton: {
    position: 'absolute',
    width: 18,
    height: 18,
    right: 20,
    top: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeContainer: {
    position: 'absolute',
    width: 58,
    height: 144,
    left: screenWidth / 2 - 29, // Center horizontally
    top: screenHeight / 2 - 72 - 34, // Center vertically with offset
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeIndicator: {
    width: 58,
    height: 144,
    backgroundColor: 'rgba(9, 9, 11, 0.5)',
    borderRadius: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeText: {
    position: 'absolute',
    width: 123,
    height: 37,
    left: screenWidth / 2 - 61.5, // Center horizontally
    top: 463,
    fontFamily: 'ABC Favorit Unlicensed Trial',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 25,
    textAlign: 'center',
    color: '#E2E9ED',
  },
});

export default SwipeOverlay;
