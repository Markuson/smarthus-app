/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from 'react';
import { Alert, AppState } from 'react-native';
import { addEventListener as networkListener } from '@react-native-community/netinfo';
import { useSelector, useDispatch } from 'react-redux';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';
import { RootState } from './src/redux/store';
import MyNavigator from './src/Navigation';
import LocationPermission from './src/utils/Permisions';
import { smarthusDataType } from './src/types';
import { MQTT } from './src/utils/mqttClient';

const App: React.FC = () => {
  const appState = useRef(AppState.currentState);
  const dispatch = useDispatch();
  const mqttClient = useSelector((state: RootState) => state.mqttClient);
  const ssid = useSelector((state: RootState) => state.ssid);
  const homeNetwork = useSelector((state: RootState) => state.homeNetwork);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        if (!connected) {
          !!mqttClient && global.mqttSubscribe();
        } else {
          !!mqttClient && global.mqttUpdate();
        }
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    (async () => {
      let checkPermission = await LocationPermission.check();
      if (checkPermission === false) {
        Alert.alert(
          'Permission needed',
          'Permission to access is needed for smarthus app to work! Restart app and allow us to access the location.'
        );
      }
    })();
  }, []);

  useEffect(() => {
    if (mqttClient === undefined) {
      dispatch({
        type: 'SET_MQTT_CLIENT',
        payload: new MQTT(),
      });
    } else {
      global.mqttInit();
      global.mqttSubscribe();
      global.mqttUpdate();
    }
  }, [mqttClient]);

  useEffect(() => {
    ssid === homeNetwork && homeNetwork !== undefined
      ? dispatch({
          type: 'SET_NOT_AT_HOME',
          payload: false,
        })
      : dispatch({
          type: 'SET_NOT_AT_HOME',
          payload: true,
        });
  }, [ssid, homeNetwork]);

  networkListener(networkState => {
    if (ssid !== networkState?.details?.ssid) {
      dispatch({
        type: 'SET_ACTUAL_SSID',
        payload: networkState?.details?.ssid,
      });
    }
  });

  global.mqttInit = () => {
    mqttClient.init((error: any) =>
      global.mqttError(`ERROR ON MQTT INIIT: ${error}`)
    );
  };

  global.mqttSubscribe = () => {
    mqttClient.subscribe(
      undefined,
      (message: smarthusDataType) => {
        if (!connected) {
          setConnected(true);
        }
        global.mqttMessage(message);
      },
      (error: string) => {
        if (error.toLowerCase().includes('disconnect')) {
          setConnected(false);
        } else {
          global.mqttError(`ERROR ON MQTT SUBSCRIBE: ${error}`);
        }
      }
    );
  };

  global.mqttError = (message: string) => {
    console.error(message);
    Toast.show(message, {
      duration: Toast.durations.SHORT,
      position: -80,
      shadow: true,
      animation: true,
      hideOnPress: true,
    });
  };

  global.mqttMessage = (message: smarthusDataType) => {
    dispatch({
      type: 'SET_DATA',
      payload: message.data,
    });
    dispatch({
      type: 'SET_TIME',
      payload: message.timestamp,
    });
  };

  global.mqttUpdate = async () => {
    if (!connected) {
      global.mqttSubscribe();
    }
    await mqttClient.update((error: any) => {
      console.error(error);
      global.mqttError(`ERROR ON MQTT UPDATE: ${error}`);
    });
  };

  global.mqttPublish = async (topic, data) => {
    await mqttClient.publish(topic, data, (error: any) =>
      global.mqttError(`ERROR ON MQTT PUBLISH: ${error}`)
    );
  };
  return (
    <RootSiblingParent>
      <MyNavigator />
    </RootSiblingParent>
  );
};

export default App;
