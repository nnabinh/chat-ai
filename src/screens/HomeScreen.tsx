import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { switchCharacter } from '../store/chatSlice';
import MessageBubble from '../components/MessageBubble';
import TypingIndicator from '../components/TypingIndicator';
import ChatInput from '../components/ChatInput';
import SwipeOverlay from '../components/SwipeOverlay';
import { HeartIcon, ChatIcon, PhoneIcon, MenuIcon } from '../components/Icons';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { messages, isTyping, currentCharacter } = useSelector(
    (state: RootState) => state.chat
  );

  // State for swipe overlay - show on first render
  const [showSwipeOverlay, setShowSwipeOverlay] = useState(true);

  const translateY = useSharedValue(0);

  // Mika Kobuyashi character data
  const mikaCharacter = {
    id: '11',
    name: 'Mika Kobuyashi',
    avatar: require('../../assets/images/mika-avatar.jpg'),
    description:
      "Shin Lewis is a quiet, introverted soul who'd rather stay in his cozy apartment with his sketches than deal with the outside world. He's the type... Read More",
    likes: 1200,
    messages: 34200,
    greeting: 'Eh-h u are my new brother? *Shy looks*',
  };

  const handleCloseOverlay = () => {
    setShowSwipeOverlay(false);
  };

  const handleSwipeToNextChat = () => {
    dispatch(switchCharacter(mikaCharacter));
    setShowSwipeOverlay(false);
  };

  const gestureHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: (_, context) => {
        context.startY = translateY.value;
      },
      onActive: (event, context) => {
        translateY.value = context.startY + event.translationY;
      },
      onEnd: (event) => {
        // If swiped up more than 100px, switch to next character
        if (event.translationY < -100) {
          runOnJS(handleSwipeToNextChat)();
        }
        translateY.value = 0;
      },
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <View style={styles.container}>
      {/* Background Image with Blur */}
      <ImageBackground
        source={
          currentCharacter?.avatar ||
          require('../../assets/images/background.jpg')
        }
        style={styles.backgroundImage}
        blurRadius={9}
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

      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.safeAreaWrapper, animatedStyle]}>
          <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <View style={styles.characterInfo}>
                  <Image
                    source={
                      currentCharacter?.avatar ||
                      require('../../assets/images/avatar.jpg')
                    }
                    style={styles.avatar}
                  />
                  <Text style={styles.characterName}>
                    {currentCharacter?.name || 'Anya Volkov'}
                  </Text>
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

              {/* Stats */}
              <BlurView intensity={60} style={styles.statsContainer}>
                <View style={styles.stat}>
                  <HeartIcon />
                  <Text style={styles.statText}>
                    {((currentCharacter?.likes || 1200) / 1000).toFixed(1)}k
                  </Text>
                </View>
                <View style={styles.stat}>
                  <ChatIcon />
                  <Text style={styles.statText}>
                    {((currentCharacter?.messages || 34200) / 1000).toFixed(1)}k
                  </Text>
                </View>
              </BlurView>
            </View>

            {/* Character Description */}
            <BlurView intensity={80} style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>
                {currentCharacter?.description ||
                  "Shin Lewis is a quiet, introverted soul who'd rather stay in his cozy apartment with his sketches than deal with the outside world. He's the type... Read More"}
              </Text>
            </BlurView>

            {/* Chat Messages */}
            <ScrollView
              style={styles.messagesContainer}
              contentContainerStyle={styles.messagesContent}
              showsVerticalScrollIndicator={false}
            >
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {isTyping && <TypingIndicator />}
            </ScrollView>

            {/* Chat Input */}
            <ChatInput />
          </SafeAreaView>
        </Animated.View>
      </PanGestureHandler>

      {/* Swipe Overlay */}
      <SwipeOverlay
        visible={showSwipeOverlay}
        onClose={handleCloseOverlay}
        onSwipeUp={handleSwipeToNextChat}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090B',
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
  safeAreaWrapper: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 14,
    paddingTop: 12,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  characterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
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
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(110, 110, 110, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 99,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    marginLeft: 54,
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
    marginHorizontal: 14,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(9, 9, 11, 0.8)',
    borderWidth: 1,
    borderColor: '#373737',
    borderRadius: 12,
    padding: 16,
  },
  descriptionText: {
    color: '#C9C9C9',
    fontSize: 16,
    lineHeight: 22,
  },
  messagesContainer: {
    flex: 1,
    paddingBottom: 140, // Space for input and tab bar
  },
  messagesContent: {
    paddingTop: 20,
  },
});

export default HomeScreen;
