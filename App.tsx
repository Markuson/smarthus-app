import React, { useEffect, useReducer, useState } from 'react';
import { Alert } from 'react-native';
import LocationPermission from './src/utils/Permisions';
import { fetch as netinfoFetch } from '@react-native-community/netinfo';
import { initialState, reducer } from './src/redux';
import { ContextProvider } from './src/Context';
import MyNavigator from './src/Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

let ws: any;

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [devicesChecked, setDevicesChecked] = useState(false);

  useEffect(() => {
    (async () => {
      let checkPermission = await LocationPermission.request();
      if (checkPermission === false) {
        Alert.alert(
          'Permission needed',
          'Permission to access is needed for smarthus app to work! Restart app and allow us to access the location.'
        );
      } else {
        getNetInfo();
        setWSconnection();
      }
    })();
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  useEffect(() => {
    if (!devicesChecked && state.tradfri.data.length) {
      checkDevices();
    }
  }, [state.tradfri]);

  useEffect(() => {
    state.ssid === state.homeNetwork.ssid
      ? dispatch({
          type: 'SET_NOT_AT_HOME',
          payload: false,
        })
      : dispatch({
          type: 'SET_NOT_AT_HOME',
          payload: true,
        });
  }, [state.ssid, state.homeNetwork.ssid]);

  const checkDevices = () => {
    if (state.tradfri.data.some((device: any) => !device.label)) {
      Alert.alert(
        'New element detected',
        'we detected a new element in you tradfri system, put name to it on configuration folder'
      );
    }
    setDevicesChecked(true);
  };

  const getNetInfo = async () => {
    const netInfo: any = await netinfoFetch();
    netInfo && netInfo.type === 'wifi'
      ? dispatch({
          type: 'SET_ACTUAL_SSID',
          payload: netInfo.details.ssid,
        })
      : dispatch({
          type: 'SET_ACTUAL_SSID',
          payload: netInfo.details.ssid,
        });
  };

  const setNetInfo = async (
    serverIp: string | undefined,
    ssid: string | undefined
  ) => {
    let homeNetwork = {
      ssid: ssid ? ssid : state.homeNetwork.ssid,
      serverIp: serverIp ? serverIp : state.homeNetwork.serverIp,
    };
    dispatch({
      type: 'SET_TRADFRI_DATA',
      payload: {
        data: [],
        timestamp: '',
      },
    });
    await AsyncStorage.setItem('homeNetwork', JSON.stringify(homeNetwork));
    dispatch({
      type: 'SET_HOME_NETWORK',
      payload: homeNetwork,
    });
    setWSconnection();
  };

  const setWSconnection = async () => {
    const homeNetworkstr = await AsyncStorage.getItem('homeNetwork');
    if (homeNetworkstr !== null) {
      const homeNetwork = JSON.parse(homeNetworkstr);
      dispatch({
        type: 'SET_HOME_NETWORK',
        payload: homeNetwork,
      });
      if (homeNetwork.serverIp) {
        ws = new WebSocket(`ws://${homeNetwork.serverIp}:1880/ws/smarthus`);
        wsCreateListener();
      } else {
        Alert.alert(
          'Network not set',
          'You need to set the network on the settings menu to be able to use smarhus.'
        );
      }
    } else {
      Alert.alert(
        'Network not set',
        'You need to set the network on the settings menu to be able to use smarhus.'
      );
    }
  };

  const wsCreateListener = () => {
    ws.onopen = () => wsSendData({}, 'get');
    ws.onmessage = (event: any) => {
      // console.log('event: ', JSON.parse(event.data));
      dispatch({
        type: 'SET_TRADFRI_DATA',
        payload: JSON.parse(event.data),
      });
    };
  };

  const wsSendData = (
    data: any,
    request: 'get' | 'send' | 'name',
    device: 'tradfri' | 'greenhouse' = 'tradfri'
  ) => {
    if (ws) {
      ws.send(
        JSON.stringify({
          timestamp: new Date().toLocaleString(),
          request,
          device,
          data,
        })
      );
    }
  };

  return (
    <ContextProvider
      dispatch={dispatch}
      state={state}
      getNetInfo={getNetInfo}
      wsSendData={wsSendData}
      setNetInfo={setNetInfo}
    >
      <MyNavigator />
    </ContextProvider>
  );
};

export default App;
