import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import { SwipeUpIcon, CloseIcon } from './Icons';

interface SwipeOverlayProps {
  visible: boolean;
  onClose: () => void;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SwipeOverlay: React.FC<SwipeOverlayProps> = ({ visible, onClose }) => {
  const translateY = useSharedValue(0);

  const gestureHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: (_, context) => {
        context.startY = translateY.value;
      },
      onActive: (event, context) => {
        translateY.value = context.startY + event.translationY;
      },
      onEnd: (event) => {
        // If swiped up more than 50px, close the overlay
        if (event.translationY < -50) {
          runOnJS(onClose)();
        }
        translateY.value = 0;
      },
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  if (!visible) return null;

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.overlay, animatedStyle]}>
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
        <Text style={styles.swipeText}>
          Swipe to move{'\n'}to the next chat
        </Text>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
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
