import React from 'react';
import { ImageBackground, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
// import TradfriSettings from '../../components/organisms/TradfriSettings';
import NetworkSettings from '../../components/organisms/NetworkSettings';

import GlobalStyles from '../../styles/GlobalStyles';

const SettingsScreen: React.FC = () => {
  const ssid = useSelector((state: RootState) => state.ssid);
  const homeNetwork = useSelector((state: RootState) => state.homeNetwork);
  const dispatch = useDispatch();

  const setNetInfo = async (_ssid: string) => {
    dispatch({
      type: 'SET_HOME_NETWORK',
      payload: _ssid,
    });
  };
  return (
    <ImageBackground
      source={require('../../../assets/background2.png')}
      resizeMode="cover"
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ flex: 1, justifyContent: 'center' }}
    >
      <View style={GlobalStyles.appContainer}>
        <NetworkSettings
          actualSsid={ssid}
          homeNetwork={homeNetwork}
          onSetNetInfo={setNetInfo}
        />
        {/* <TradfriSettings
          devices={state.tradfri.data}
          onNameChange={(id: string, name: string) =>
          }
        /> */}
      </View>
    </ImageBackground>
  );
};

export default SettingsScreen;
