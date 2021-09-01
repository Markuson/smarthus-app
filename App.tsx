import React from 'react';
import { Appearance } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import aspect from './src/styles/GlobalAspect';
import GreenhouseScreen from './src/screens/GreenhouseScreen';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';


const Tab = createBottomTabNavigator();

export type Props = {
};

const App: React.FC<Props> = () => {
  const MyTheme =
    Appearance.getColorScheme() === 'dark'
      ? {
          ...DarkTheme,
          colors: {
            ...DarkTheme.colors,
            ...aspect.color,
          },
        }
      : {
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            ...aspect.color,
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
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: MyTheme.colors.primary,
          tabBarInactiveTintColor: MyTheme.colors.disabled,
          tabBarShowLabel: false,
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="Greenhouse"
          children={() => <GreenhouseScreen theme={MyTheme} />}
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
