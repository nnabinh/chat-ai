import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from '../features/home/screens/HomeScreen';
import SearchScreen from '../features/search/screens/SearchScreen';
import CreateScreen from '../features/create/screens/CreateScreen';
import MessagesScreen from '../features/messages/screens/MessagesScreen';
import ProfileScreen from '../features/profile/screens/ProfileScreen';
import {
  HomeIcon,
  SearchIcon,
  CreateIcon,
  MessagesIcon,
  ProfileIcon,
} from '../components/Icons';

const Tab = createBottomTabNavigator();

// Default tab bar height from Figma design
const TAB_BAR_HEIGHT = 56;

const BottomTabNavigator: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          styles.tabBar,
          {
            height: TAB_BAR_HEIGHT + insets.bottom,
            paddingBottom: insets.bottom,
          },
        ],
        tabBarItemStyle: styles.tabBarItem,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarActiveTintColor: '#F43F3F',
        tabBarInactiveTintColor: '#AFAFAF',
        tabBarBackground: () => (
          <View
            style={[
              styles.tabBarBackground,
              {
                height: TAB_BAR_HEIGHT + insets.bottom,
                paddingBottom: insets.bottom,
              },
            ]}
          />
        ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <HomeIcon color={focused ? '#F43F3F' : '#AFAFAF'} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <SearchIcon color={focused ? '#F43F3F' : '#AFAFAF'} />
          ),
          tabBarLabel: 'Search',
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CreateIcon color={focused ? '#F43F3F' : '#AFAFAF'} />
          ),
          tabBarLabel: 'Create',
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MessagesIcon color={focused ? '#F43F3F' : '#AFAFAF'} />
          ),
          tabBarLabel: 'Messages',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <ProfileIcon color={focused ? '#F43F3F' : '#AFAFAF'} />
          ),
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: TAB_BAR_HEIGHT,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    paddingHorizontal: 8,
  },
  tabBarBackground: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  tabBarItem: {
    paddingTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0,
    gap: 7,
  },
  tabBarLabel: {
    fontFamily: 'ABC Favorit Unlicensed Trial',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
  },
});

export default BottomTabNavigator;
