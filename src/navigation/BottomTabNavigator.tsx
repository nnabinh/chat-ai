import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import CreateScreen from '../screens/CreateScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {
  HomeIcon,
  SearchIcon,
  CreateIcon,
  MessagesIcon,
  ProfileIcon,
} from '../components/Icons';

const Tab = createBottomTabNavigator();

const TabLabel: React.FC<{ focused: boolean; title: string }> = ({
  focused,
  title,
}) => (
  <Text
    style={[
      styles.tabLabel,
      { color: focused ? '#F43F3F' : '#AFAFAF' },
    ]}
  >
    {title}
  </Text>
);

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => <View style={styles.tabBarBackground} />,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <HomeIcon color={focused ? '#F43F3F' : '#AFAFAF'} />
          ),
          tabBarLabel: ({ focused }) => (
            <TabLabel focused={focused} title="Home" />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <SearchIcon color={focused ? '#F43F3F' : '#AFAFAF'} />
          ),
          tabBarLabel: ({ focused }) => (
            <TabLabel focused={focused} title="Search" />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CreateIcon color={focused ? '#F43F3F' : '#AFAFAF'} />
          ),
          tabBarLabel: ({ focused }) => (
            <TabLabel focused={focused} title="Create" />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MessagesIcon color={focused ? '#F43F3F' : '#AFAFAF'} />
          ),
          tabBarLabel: ({ focused }) => (
            <TabLabel focused={focused} title="Messages" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <ProfileIcon color={focused ? '#F43F3F' : '#AFAFAF'} />
          ),
          tabBarLabel: ({ focused }) => (
            <TabLabel focused={focused} title="Profile" />
          ),
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
    height: 56,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabBarBackground: {
    flex: 1,
    backgroundColor: '#09090B',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 4,
  },
});

export default BottomTabNavigator;