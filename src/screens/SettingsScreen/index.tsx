import React from 'react';
import { View } from 'react-native';
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
    <View style={GlobalStyles.appContainer}>
      <NetworkSettings
        actualSsid={ssid}
        homeNetwork={homeNetwork}
        onSetNetInfo={setNetInfo}
      />
      {/* <TradfriSettings
        devices={state.tradfri.data}
        onNameChange={(id: string, name: string) =>
          console.log('NAME CHANGE')
        }
      /> */}
    </View>
  );
};

export default SettingsScreen;
