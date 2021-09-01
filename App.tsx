import React from 'react';
import { Text, useColorScheme, View } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import aspect from './src/styles/GlobalAspect';
import styles from './src/styles/GlobalStyles';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function HomeScreen({ theme }) {
  return (
    <View style={styles.appContainer}>
      <Text style={{ color: theme.colors.text }}>Home</Text>
    </View>
  );
}
function GrenhouseScreen({ theme }) {
  return (
    <View style={styles.appContainer}>
      <Text style={{ color: theme.colors.text }}>Greenhouse!</Text>
    </View>
  );
}

function SettingsScreen({ theme }) {
  return (
    <View style={styles.appContainer}>
      <Text style={{ color: theme.colors.text }}>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const App = () => {
  const MyTheme =
    useColorScheme() === 'dark'
      ? {
          ...DarkTheme,
          colors: {
            ...DarkTheme.colors,
            ...aspect.darkTheme,
          },
        }
      : {
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            ...aspect.lightTheme,
          },
        };
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
        backBehavior={'initialRoute'}
        initialRouteName={'Home'}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home-lightbulb' : 'home-lightbulb-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'cog' : 'cog-outline';
            } else if (route.name === 'Greenhouse') {
              iconName = focused ? 'sprout' : 'sprout-outline';
            }

            // You can return any component that you like here!
            return <Icons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: MyTheme.colors.primary,
          tabBarInactiveTintColor: MyTheme.colors.disabled,
          tabBarShowLabel: false,
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="Greenhouse"
          children={() => <GrenhouseScreen theme={MyTheme} />}
        />
        <Tab.Screen
          name="Home"
          children={() => <HomeScreen theme={MyTheme} />}
        />
        <Tab.Screen
          name="Settings"
          children={() => <SettingsScreen theme={MyTheme} />}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
