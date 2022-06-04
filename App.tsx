import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { addEventListener as networkListener } from '@react-native-community/netinfo';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './src/redux/store';
import MyNavigator from './src/Navigation';
import LocationPermission from './src/utils/Permisions';
import { smarthusDataType } from './src/types';
import { MQTT } from './src/utils/mqttClient';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const mqttClient = useSelector((state: RootState) => state.mqttClient);
  const ssid = useSelector((state: RootState) => state.ssid);
  const homeNetwork = useSelector((state: RootState) => state.homeNetwork);

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
      handleMqttInit();
      handleMqttUpdate();
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
        payload: networkState.details.ssid,
      });
    }
  });

  const handleMqttInit = () => {
    mqttClient.init((error: any) =>
      console.error('ERROR ON MQTT INIIT: ', error)
    );
    mqttClient.subscribe(undefined, handleMqttMessage, error =>
      handleMqttError(`ERROR ON MQTT SUBSCRIBE: ${error}`)
    );
  };
  const handleMqttError = (message: string) => {
    console.error(message);
  };

  const handleMqttMessage = (message: smarthusDataType) => {
    dispatch({
      type: 'SET_DATA',
      payload: message,
    });
  };

  const handleMqttUpdate = async () => {
    await mqttClient.update((error: any) =>
      handleMqttError(`ERROR ON MQTT UPDATE: ${error}`)
    );
  };

  return <MyNavigator />;
};

export default App;
