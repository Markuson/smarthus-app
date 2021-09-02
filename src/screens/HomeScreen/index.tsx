import React from 'react';
import { View } from 'react-native';
import LightSwitch from '../../components/LightSwitch';
import Loading from '../../components/Loading';

import { styles } from '../../styles/GlobalStyles';

export type Props = {
  allData: any;
  onSend: (data: any, request: 'get' | 'send') => void;
};

const HomeScreen: React.FC<Props> = ({ allData, onSend }) => {
  const handlePress = (deviceData: any) => {
    // console.log('deviceData: ', deviceData);
    onSend(
      {
        name: deviceData.name,
        id: deviceData.id,
        on: !deviceData.on,
      },
      'send'
    );
  };
  return (
    <View style={styles.appContainer}>
      {allData.data.length > 0 ? (
        <LightSwitch
          lightStatus={allData.data[0].on}
          name={allData.data[0].name}
          onPress={() => handlePress(allData.data[0])}
        />
      ) : (
        <Loading size="large" />
      )}
    </View>
  );
};

export default HomeScreen;
