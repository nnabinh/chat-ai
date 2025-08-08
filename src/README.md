# Feature-Based Architecture

This codebase has been refactored from a type-based structure to a feature-based structure for better maintainability and scalability.

## Directory Structure

```
src/
├── components/           # Global reusable UI components
│   ├── Icons.tsx        # Global icon components (HeartIcon, ChatIcon, PhoneIcon, MenuIcon, etc.)
│   ├── SwipeOverlay.tsx # Global overlay component
│   └── TypingIndicator.tsx # Global typing indicator
├── features/            # Feature-based modules
│   ├── chat/           # Chat functionality & state management
│   │   ├── components/ # Chat-specific components
│   │   │   ├── ChatInput.tsx    # Message input with send button
│   │   │   └── MessageBubble.tsx # Individual message display
│   │   ├── api.ts      # Chat API service & character data
│   │   └── chatSlice.ts # Chat Redux slice & message management
│   ├── home/           # Main chat screen feature
│   │   ├── screens/    # Home screens
│   │   │   └── HomeScreen.tsx   # Main refactored home screen
│   │   ├── components/ # Home-specific components
│   │   │   ├── ChatHeader.tsx           # User info, avatar, stats, actions
│   │   │   ├── CharacterDescription.tsx # Expandable character info
│   │   │   ├── MessagesList.tsx         # Message rendering with markdown
│   │   │   ├── MessageContextMenu.tsx   # Long-press context menu
│   │   │   └── index.ts                 # Component exports
│   │   └── hooks/      # Home-specific custom hooks
│   │       ├── useChat.ts               # Chat state management
│   │       ├── useMessageActions.ts     # Message interactions (edit/delete/copy)
│   │       ├── useCharacterDescription.ts # Description expand/collapse
│   │       └── index.ts                 # Hook exports
│   ├── search/         # Character search & discovery
│   │   ├── screens/    # Search screens
│   │   │   └── SearchScreen.tsx
│   │   └── components/ # Search-specific components
│   │       └── CharacterCard.tsx        # Character preview cards
│   ├── create/         # Character creation feature
│   │   └── screens/
│   │       └── CreateScreen.tsx
│   ├── messages/       # Messages/conversations feature
│   │   └── screens/
│   │       └── MessagesScreen.tsx
│   ├── profile/        # User profile feature
│   │   └── screens/
│   │       └── ProfileScreen.tsx
│   └── common/         # Shared feature components (future use)
│       ├── components/
│       └── hooks/
├── navigation/         # App-wide navigation
│   └── BottomTabNavigator.tsx # Tab navigation with feature screens
├── store/             # Global Redux store configuration
│   └── index.ts       # Store setup with feature reducers
├── types/             # TypeScript type definitions
│   └── index.ts       # Global interfaces (Message, Character, etc.)
├── utils/             # Global utility functions (empty - future use)
├── theme/             # Theme system (empty - future use)
└── config/            # App configuration (empty - future use)
```

## Key Benefits

1. **Feature Isolation**: Each feature is self-contained with its own components, hooks, and logic
2. **Better Maintainability**: Easier to locate and modify feature-specific code
3. **Scalability**: New features can be added without affecting existing ones
4. **Reusability**: Common components and hooks are easily shared
5. **Clear Boundaries**: Separation of concerns between features

## Core Features & Components

### 🏠 Home Feature (Main Chat Interface)

The original 600+ line HomeScreen has been refactored into a modular architecture:

#### **Custom Hooks:**

- **`useChat`**: Manages chat state from Redux (messages, currentCharacter)
- **`useMessageActions`**: Handles message interactions (edit, delete, copy, long-press)
- **`useCharacterDescription`**: Manages description expand/collapse state

#### **UI Components:**

- **`ChatHeader`**: User avatar, name, status, stats badge, action buttons (phone/menu)
- **`CharacterDescription`**: Expandable character bio with "Read More" functionality
- **`MessagesList`**: Message rendering with markdown support (_italic_, **bold**)
- **`MessageContextMenu`**: Context menu for message actions (Copy, Edit, Delete)

### 💬 Chat Feature (Core Messaging)

- **`ChatInput`**: Message input with send button (24x24px, 4px padding)
- **`MessageBubble`**: Individual message display component
- **`chatSlice`**: Redux state management for messages and characters
- **`api`**: Character data and API service layer

### 🔍 Search Feature

- **`CharacterCard`**: Character preview cards for browsing
- **`SearchScreen`**: Character discovery interface

### 🎨 Global Components

- **`Icons`**: Comprehensive icon library (Home, Search, Create, Messages, Profile, Heart, Chat, Phone, Menu, Send)
- **`SwipeOverlay`**: Reusable overlay component
- **`TypingIndicator`**: Chat typing animation

## Technical Features

### 🎯 Advanced Functionality

- **Markdown Rendering**: AI messages support `*italic*` and `**bold**` formatting
- **Message Interactions**: Long-press for context menu (Copy, Edit, Delete)
- **Expandable Descriptions**: Character info with "Read More" toggle
- **Keyboard Awareness**: Auto-scroll when keyboard appears
- **Dynamic Backgrounds**: Character-specific background images
- **Responsive Design**: Safe area insets and dynamic tab bar height

### 🏗️ Architecture Patterns

- **Custom Hooks**: Separation of business logic from UI
- **Component Composition**: Small, focused, reusable components
- **Feature Modules**: Self-contained feature directories
- **Index Exports**: Clean import/export patterns
- **TypeScript**: Full type safety across the application

## Import Strategy

- **Feature-specific**: Relative paths within features (`./`, `../`)
- **Global components**: Absolute from `src/components/`
- **Cross-feature**: Absolute paths from `src/features/`
- **Store & Types**: Centralized imports from `src/store/`, `src/types/`

## Recent Updates

- ✅ **Refactored HomeScreen** into modular components and hooks
- ✅ **Feature-based architecture** implemented
- ✅ **Import paths** updated throughout codebase
- ✅ **Code formatting** improved with consistent styling
- ✅ **Component cleanup** and optimization
- ✅ **Documentation** updated to reflect current structure

## Migration Benefits

1. **🎯 Reduced Complexity**: HomeScreen from 600+ lines to ~100 lines
2. **🔧 Better Maintainability**: Easy to locate and modify feature-specific code
3. **📈 Enhanced Scalability**: New features can be added independently
4. **♻️ Improved Reusability**: Common components and hooks easily shared
5. **🧪 Better Testing**: Isolated components and hooks are easier to test
6. **👥 Developer Experience**: Clear file organization and responsibilities

## Current Statistics

- **📁 Total TypeScript Files**: 25 files
- **🏗️ Features**: 5 main features (home, chat, search, create, messages, profile)
- **🧩 Components**: 12 specialized components
- **🎣 Custom Hooks**: 3 feature-specific hooks
- **📦 Global Components**: 3 reusable components
- **🔄 Code Reduction**: HomeScreen reduced from 600+ lines to ~100 lines
- **📂 Directory Structure**: Feature-based with clear separation of concerns
