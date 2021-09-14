import React, { useContext } from 'react';
import { ImageBackground, View } from 'react-native';
import { Context } from '../../Context';

import LightSwitch from '../../components/molecules/LightSwitch';
import Loading from '../../components/atoms/Loading';

import GlobalStyles from '../../styles/GlobalStyles';
import RefreshButton from '../../components/molecules/refreshButton';
import IconTextCenter from '../../components/molecules/IconTextCenter';

import GlobalAspect from '../../styles/GlobalAspect';

const HomeScreen: React.FC = () => {
  const { state, getNetInfo, wsSendData } = useContext(Context);

  const handlePress = (deviceData: any) => {
    // console.log('deviceData: ', deviceData);
    wsSendData(
      {
        name: deviceData.name,
        id: deviceData.id,
        on: !deviceData.on,
      },
      'send'
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
        <RefreshButton onRefresh={() => getNetInfo()} />
        <View style={GlobalStyles.homeContainer}>
          {state.notAtHome ?
            <IconTextCenter
            iconName={'lightbulb-off'}
            iconColor={GlobalAspect.color.icon.disabled}
            iconSize={GlobalAspect.icon.size.big}
            text={'Not conected to home network'} />
            :
            state && state.tradfri.data.length > 0 ? (
              state.tradfri.data.map((element: any, index: any) => {
                if (element.type.includes('TRADFRI') && element.label) {
                  return (
                    <LightSwitch
                      key={index}
                      isDisabled={state.notAtHome}
                      lightStatus={element.on}
                      name={element.label}
                      onPress={() => handlePress(element)}
                    />
                  );
                }
              })
            ) : (
              <Loading size="large" />
            )}
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
