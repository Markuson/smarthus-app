import React from 'react';
import { ImageBackground, View, Vibration } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import GlobalStyles from '../../styles/GlobalStyles';
import Loading from '../../components/atoms/Loading';
import TempCard from '../../components/molecules/Cards/Temperature';
import LightCard from '../../components/molecules/Cards/Light';
import prompt from 'react-native-prompt-android';

const HomeScreen: React.FC = () => {
  const notAtHome = useSelector((state: RootState) => state.notAtHome);
  const data = useSelector((state: RootState) => state.data);
  const mqttClient = useSelector((state: RootState) => state.mqttClient);

  const handleMqttPublish = async (action: 'set' | 'rename', message: any) => {
    await mqttClient.publish(action, message, (error: any) =>
      console.error(`ERROR ON MQTT PUBLISH: ${error}`)
    );
  };
  const handleRename = async (id: string, oldName: string) => {
    Vibration.vibrate(50);
    prompt(
      'Rename element',
      'Enter the new name',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: async (name: string) => {
            if (name && name !== '') {
              await mqttClient.publish('rename', { id, name }, (error: any) =>
                console.error(`ERROR ON MQTT PUBLISH: ${error}`)
              );
            }
          },
        },
      ],
      {
        cancelable: false,
        defaultValue: '',
        placeholder: oldName,
      }
    );
  };

  return (
    <ImageBackground
      source={require('../../../assets/background1.png')}
      resizeMode="cover"
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ flex: 1, justifyContent: 'center' }}
    >
      {(data?.sensors?.length || data?.tradfri?.length) && (
        <View style={GlobalStyles.appContainer}>
          <View style={GlobalStyles.homeContainer}>
            {!!data?.sensors?.length &&
              data.sensors.map((element: any, index: any) => {
                return (
                  <TempCard
                    key={index}
                    name={element.name}
                    humidity={element.humidity}
                    temperature={element.temperature}
                    onRename={() => handleRename(element.id, element.name)}
                  />
                );
              })}
            {!!data?.tradfri?.length &&
              data.tradfri.map((element: any, index: any) => {
                if (element.type.includes('TRADFRI')) {
                  return (
                    <LightCard
                      key={index}
                      disabled={notAtHome}
                      name={element.name}
                      onRename={() => handleRename(element.id, element.name)}
                      onSwitch={() =>
                        handleMqttPublish('set', {
                          id: element.id,
                          on: !element.on,
                        })
                      }
                      status={element.on}
                    />
                  );
                }
              })}
          </View>
        </View>
      )}
      {!data?.sensors?.length && !data?.tradfri?.length && (
        <View style={GlobalStyles.homeContainer}>
          <Loading size="large" />
        </View>
      )}
    </ImageBackground>
  );
};

export default HomeScreen;
