import React from 'react';
import { ImageBackground, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import GlobalStyles from '../../styles/GlobalStyles';
import aspect from '../../styles/GlobalAspect';
import LightSwitch from '../../components/molecules/LightSwitch';
import Loading from '../../components/atoms/Loading';
import Card from '../../components/atoms/Card';
import TempCard from '../../components/molecules/TempCard';

const HomeScreen: React.FC = () => {
  const notAtHome = useSelector((state: RootState) => state.notAtHome);
  const data = useSelector((state: RootState) => state.data);
  const mqttClient = useSelector((state: RootState) => state.mqttClient);

  const handleMqttPublish = async (action: 'set' | 'rename', message: any) => {
    await mqttClient.publish(action, message, (error: any) =>
      console.error(`ERROR ON MQTT PUBLISH: ${error}`)
    );
  };
  return (
    <ImageBackground
      source={require('../../../assets/background1.png')}
      resizeMode="cover"
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ flex: 1, justifyContent: 'center' }}
    >
      <View style={GlobalStyles.appContainer}>
        <View style={GlobalStyles.homeContainer}>
          {!!data?.sensors?.length &&
            data.sensors.map((element: any, index: any) => {
              return <TempCard temperature={element.temperature} />;
            })}
          {!!data?.tradfri?.length &&
            data.tradfri.map((element: any, index: any) => {
              if (element.type.includes('TRADFRI') && element.name) {
                return (
                  <LightSwitch
                    key={index}
                    isDisabled={notAtHome}
                    lightStatus={element.on}
                    name={element.name}
                    onPress={() =>
                      handleMqttPublish('set', {
                        id: element.id,
                        on: !element.on,
                      })
                    }
                  />
                );
              }
            })}
          {!data?.sensors?.length && !data?.tradfri?.length && (
            <Loading size="large" />
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
