import React from 'react';
import { View } from 'react-native';
import { useGlobalContext } from '../../Context';

import TradfriSettings from '../../components/organisms/TradfriSettings';
import NetworkSettings from '../../components/organisms/NetworkSettings';

import GlobalStyles from '../../styles/GlobalStyles';

const SettingsScreen: React.FC = () => {
  const { state, setNetInfo, wsSendData } = useGlobalContext();

  return (
    <View style={GlobalStyles.appContainer}>
      <NetworkSettings
        actualSsid={state.ssid}
        homeNetwork={state.homeNetwork}
        onSetNetInfo={(ip: string | undefined, ssid: string | undefined) =>
          setNetInfo(ip, ssid)
        }
      />
      <TradfriSettings
        devices={state.tradfri.data}
        onNameChange={(id: string, name: string) =>
          wsSendData(
            {
              id,
              name,
            },
            'name'
          )
        }
      />
    </View>
  );
};

export default SettingsScreen;
