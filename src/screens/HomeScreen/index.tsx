import React from 'react';
import { ImageBackground, View, Text } from 'react-native';
import { useGlobalContext } from '../../Context';
import GlobalStyles from '../../styles/GlobalStyles';
import aspect from '../../styles/GlobalAspect';
import LightSwitch from '../../components/molecules/LightSwitch';
import Loading from '../../components/atoms/Loading';
import RefreshButton from '../../components/molecules/refreshButton';

const HomeScreen: React.FC = () => {
  const { state, data, getNetInfo, mqttPublish, mqttUpdate } =
    useGlobalContext();

  const handlePress = async (deviceData: any) => {
    await mqttPublish('set', { id: deviceData.id, on: !deviceData.on });
  };
  return (
    <ImageBackground
      source={require('../../../assets/background1.png')}
      resizeMode="cover"
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ flex: 1, justifyContent: 'center' }}
    >
      <View style={GlobalStyles.appContainer}>
        <RefreshButton
          onRefresh={async () => {
            getNetInfo();
            await mqttUpdate();
        }} />
        <View style={GlobalStyles.homeContainer}>
          {!!data.sensors.length &&
            data.sensors.map((element: any, index: any) => {
              return (
                <Text style={{ color: aspect.color.textEmphasis }} key={index}>
                  {element.temperature} ºC
                </Text>
              );
            })}
          {!!data.tradfri.length &&
            data.tradfri.map((element: any, index: any) => {
              if (element.type.includes('TRADFRI') && element.name) {
                return (
                  <LightSwitch
                    key={index}
                    isDisabled={state.notAtHome}
                    lightStatus={element.on}
                    name={element.name}
                    onPress={() => handlePress(element)}
                  />
                );
              }
            })}
          {!data.sensors.length && !data.tradfri.length && (
            <Loading size="large" />
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
