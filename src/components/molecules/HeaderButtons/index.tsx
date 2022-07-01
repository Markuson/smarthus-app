import React from 'react';
import { Vibration, View } from 'react-native';

import PressableIcon from '../../atoms/PressableIcon' 

import styles from './HeaderButtons.styles';

export type Props = {
  onRefresh: any;
  vibrateTime?: number
};

const HeaderButtons: React.FC<Props> = ({ onRefresh, vibrateTime }) => {
  const handleRefresh = () => {
    if(vibrateTime) Vibration.vibrate(vibrateTime);
    onRefresh();
  };

  return (
    <View style={styles.container}>
      <PressableIcon
        name={'refresh'}
        size={'big'}
        onPress={() => handleRefresh()}
      />
    </View>
  );
};

export default HeaderButtons;
