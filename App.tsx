import React, {useEffect, useState} from 'react';
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

export type Props = {
};

const Tab = createBottomTabNavigator();

const ws = new WebSocket("ws://192.168.10.185:1880/ws/example")

const App: React.FC<Props> = () => {
  const [data, setEcho] = useState({echo: '', timestamp: ''})
  
  useEffect(() => {
      wsCreateListener()
      return () => {
        ws.close()
      }

  }, [])
  const wsSendData = () => {
    ws.send(JSON.stringify({timestamp: new Date().toLocaleString(), data: 'hola'}))
  }

  const wsCreateListener = () => {
    ws.onopen = () => ws.send(JSON.stringify({timestamp: new Date().toLocaleString(), data: 'conection opened'}))

    ws.onmessage = ({data}) => {
      console.log(data);
      setEcho({echo: data, timestamp: new Date().toISOString()});
    }
  }
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
          children={() => <HomeScreen onSend={wsSendData} />}
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
