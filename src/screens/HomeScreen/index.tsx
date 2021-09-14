import React, { useContext } from 'react';
import { ImageBackground, View } from 'react-native';
import { Context } from '../../Context';

import TradfriSwitches from '../../components/organisms/TradfriSwitches';
import styles from '../../styles/GlobalStyles';

const HomeScreen: React.FC = () => {
  const { state, getNetInfo, wsSendData } = useContext(Context);

  return (
    <ImageBackground
      source={require('../../../assets/background1.png')}
      resizeMode="cover"
      // eslint-disable-next-line react-native/no-inline-styles
      style={styles.appContainer}
    >
      <TradfriSwitches
        notAtHome={state.notAtHome}
        onPress={(deviceData: any) => wsSendData(
          {
            name: deviceData.name,
            id: deviceData.id,
            on: !deviceData.on,
          },
          'send'
        )}
        onRefresh={() => getNetInfo()}
        tradfriData={state.tradfri ? state.tradfri.data : []}
      />
    </ImageBackground>
  );
};

export default HomeScreen;
