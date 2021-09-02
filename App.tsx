import React, { useEffect, useState } from 'react';
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

export type Props = {};

const Tab = createBottomTabNavigator();

const ws = new WebSocket('ws://192.168.10.185:1880/ws/smarthus');

const App: React.FC<Props> = () => {
  const [smarthusData, setSmarthusData] = useState({ data: {}, timestamp: '' });

  useEffect(() => {
    wsCreateListener();
    return () => {
      ws.close();
    };
  }, []);

  const wsSendData = (data: any, request: 'get' | 'send') => {
    ws.send(
      JSON.stringify({
        timestamp: new Date().toLocaleString(),
        request,
        data,
      })
    );
  };

  const wsCreateListener = () => {
    ws.onopen = () => wsSendData({}, 'get');
    ws.onmessage = (event: any) => {
      // console.log('event: ', JSON.parse(event.data).data);
      setSmarthusData(JSON.parse(event.data));
    };
  };

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
          children={() => (
            <HomeScreen allData={smarthusData} onSend={wsSendData} />
          )}
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
