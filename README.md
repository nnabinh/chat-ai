# Chat AI - React Native App

A modern chat application built with React Native and Expo, featuring AI character interactions, infinite scroll, and beautiful UI design.

## Features

- ✅ **Modern UI Design**: Beautiful chat interface with blur effects and gradients
- ✅ **Chat Functionality**: Real-time messaging with typing indicators
- ✅ **Message Interactions**: Long press to copy, edit, or delete messages
- ✅ **Infinite Scroll**: TikTok-style vertical scrolling through character profiles
- ✅ **Redux State Management**: Using Redux Toolkit and RTK Query
- ✅ **TypeScript Support**: Fully typed codebase
- ✅ **Navigation**: React Navigation with bottom tabs
- ✅ **Code Quality**: ESLint, Prettier, and lint-staged configuration

## Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **State Management**: Redux Toolkit + RTK Query
- **Navigation**: React Navigation v6
- **UI Components**: Custom components with Expo Blur and Linear Gradient
- **Icons**: Custom SVG icons
- **Code Quality**: ESLint + Prettier + lint-staged

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ChatInput.tsx
│   ├── CharacterCard.tsx
│   ├── Icons.tsx
│   ├── MessageBubble.tsx
│   └── TypingIndicator.tsx
├── navigation/          # Navigation configuration
│   └── BottomTabNavigator.tsx
├── screens/            # Screen components
│   ├── HomeScreen.tsx
│   ├── SearchScreen.tsx
│   ├── CreateScreen.tsx
│   ├── MessagesScreen.tsx
│   └── ProfileScreen.tsx
├── store/              # Redux store configuration
│   ├── api.ts
│   ├── chatSlice.ts
│   └── index.ts
└── types/              # TypeScript type definitions
    └── index.ts
```

## Getting Started

### Prerequisites

- Node.js (v18.18+ recommended)
- Yarn (v3.6+ recommended)
- Expo CLI
- iOS Simulator or Android Emulator (or physical device)

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:nnabinh/chat-ai.git
   cd chat-ai
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn start
   ```

4. Run on your preferred platform:
   ```bash
   yarn ios      # iOS Simulator
   yarn android  # Android Emulator
   yarn web      # Web browser
   ```

## Key Features Explained

### 1. Chat Interface
- Real-time messaging with AI characters
- Typing indicators during AI response
- Message bubbles with different styles for user/AI messages
- Smooth animations and transitions

### 2. Long Press Message Actions
- **Copy**: Copy message text to clipboard
- **Edit**: Edit your own messages inline
- **Delete**: Remove messages with confirmation
- Only available for user messages

### 3. Infinite Scroll Character Discovery
- TikTok-style vertical scrolling
- Full-screen character cards with background images
- Pagination with loading states
- Smooth performance with optimized rendering

### 4. Redux State Management
- Centralized state management with Redux Toolkit
- RTK Query for API calls and caching
- Type-safe actions and reducers

## Development Scripts

```bash
yarn start          # Start Expo development server
yarn ios            # Run on iOS simulator
yarn android        # Run on Android emulator
yarn web            # Run in web browser
yarn lint           # Run ESLint
yarn lint:fix       # Fix ESLint issues
yarn format         # Format code with Prettier
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and formatting
5. Submit a pull request

## License

This project is licensed under the MIT License.