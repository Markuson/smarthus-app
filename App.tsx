import React, { useEffect, useReducer, useState } from 'react';
import { Alert } from 'react-native';
import { fetch as netinfoFetch } from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initialState, reducer } from './src/redux';
import { ContextProvider } from './src/Context';
import MyNavigator from './src/Navigation';
import LocationPermission from './src/utils/Permisions';
import { smarthusDataType } from './src/types';
import { MQTT } from './src/utils/mqttClient';

const App: React.FC = () => {
  const mqttClient = new MQTT();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [smarthusData, setSmarthusData] = useState<smarthusDataType>({
    sensors: [],
    tradfri: [],
  });

  useEffect(() => {
    (async () => {
      let checkPermission = await LocationPermission.check();
      if (checkPermission === false) {
        Alert.alert(
          'Permission needed',
          'Permission to access is needed for smarthus app to work! Restart app and allow us to access the location.'
        );
      } else {
        getNetInfo();
      }
      handleMqttInit();
      handleMqttUpdate();
    })();
    (async () => {})();
  }, []);

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

  const handleMqttInit = () => {
    mqttClient.init(error => console.error('ERROR ON MQTT INIIT: ', error));
    mqttClient.subscribe(undefined, handleMqttMessage, error =>
      handleMqttError(`ERROR ON MQTT SUBSCRIBE: ${error}`)
    );
  };
  const handleMqttError = (message: string) => {
    console.error(message);
  };

  const handleMqttMessage = (message: smarthusDataType) => {
    setSmarthusData(message);
  };

  const handleMqttPublish = async (action: 'set' | 'rename', message: any) => {
    await mqttClient.publish(action, message, error =>
      handleMqttError(`ERROR ON MQTT PUBLISH: ${error}`)
    );
  };

  const handleMqttUpdate = async () => {
    await mqttClient.update(error =>
      handleMqttError(`ERROR ON MQTT UPDATE: ${error}`)
    );
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
    } else {
      Alert.alert(
        'Network not set',
        'You need to set the network on the settings menu to be able to use smarhus.'
      );
    }
  };

  return (
    <ContextProvider
      data={smarthusData}
      dispatch={dispatch}
      state={state}
      getNetInfo={getNetInfo}
      setNetInfo={setNetInfo}
      mqttPublish={handleMqttPublish}
      mqttUpdate={handleMqttUpdate}
    >
      <MyNavigator />
    </ContextProvider>
  );
};

export default App;
