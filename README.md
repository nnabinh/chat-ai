# Chat AI

A TikTok-style character switching chat application built with React Native and Expo. Experience seamless conversations with AI characters through intuitive swipe gestures.

## 🎥 Demo

https://github.com/user-attachments/assets/7df4b098-a1b9-49a4-a36e-094f650fce38

## Installation

```bash
git clone <repository-url>
cd chat-ai
yarn install
yarn start
```

## How the Current Chat Works

### Character Switching

- **Swipe Up**: Switch between Anya and Mika characters
- **State Reset**: Chat history and UI state reset when switching characters
- **Always Active**: Swipe functionality available throughout the chat experience

### Swipe Zone Implementation

- **Fixed Height**: 300dp transparent swipe area positioned below the chat header
- **Overlay Positioning**: Sits on top of chat content (invisible)
- **UX Limitation**: Long press on messages within this area won't trigger message actions

### Design Trade-offs

The nature of a chat app is fundamentally different from TikTok Live, and we can't simply leverage the same swiping behavior without careful consideration:

**TikTok Live**:

- Primary content is video (upper half screen)
- Chat is secondary (bottom overlay)
- Clear separation between swipe area and content
- Users expect to swipe through video content

**Current Chat App**:

- Chat messages are the primary content
- Full message list needs to be displayed and accessible
- Swipe zone overlays essential chat content
- Creates interaction conflicts in the overlay area
- Users expect full message interaction (long press, selection, etc.)

> **Note**: This current implementation is for demo purposes. The swipe zone positioning and interaction model needs further discussion with UX/design team to optimize the user experience while maintaining full chat functionality.

### Other Features

- **Keyboard Dismissal**: Tap anywhere on screen elements (header, messages, description) to dismiss keyboard
- **Message Actions**: Long press messages (outside swipe zone) for copy, edit, delete options
- **Expandable Descriptions**: Tap "Read More" to expand character descriptions
- **Typing Indicators**: Visual feedback when AI is responding

---

## Features

- 🔄 **TikTok-style Character Switching**: Swipe up to switch between characters
- 💬 **Real-time Chat Interface**: Smooth messaging experience with typing indicators
- 🎨 **Dynamic Backgrounds**: Character-specific background images
- 📱 **Mobile-First Design**: Optimized for mobile devices with gesture controls
- ⌨️ **Smart Keyboard Handling**: Automatic keyboard dismissal and content adjustment
- 🎭 **Character Personalities**: Unique AI personalities with custom greetings and responses
- 📝 **Message Management**: Long-press for copy, edit, and delete functionality
- 🔍 **Expandable Content**: Collapsible character descriptions with "Read More"

## Tech Stack

- **Framework**: React Native with Expo
- **State Management**: Redux Toolkit with RTK Query
- **Navigation**: React Navigation (Bottom Tabs)
- **Gestures**: React Native Reanimated & Gesture Handler
- **Styling**: StyleSheet with custom components
- **Icons**: React Native SVG
- **Type Safety**: TypeScript throughout

## Project Structure

```
src/
├── features/
│   └── home/
│       ├── api.ts              # Character data & API endpoints
│       ├── chatSlice.ts        # Chat state management
│       ├── components/         # Feature-specific components
│       ├── hooks/              # Custom hooks
│       └── screens/            # Screen components
├── components/                 # Shared UI components
├── navigation/                 # App navigation setup
├── types/                      # TypeScript definitions
└── utils/                      # Helper functions
```
