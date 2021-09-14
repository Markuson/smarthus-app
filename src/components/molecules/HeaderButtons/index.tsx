import React from 'react';
import { Pressable, Vibration, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import PressableIcon from '../../atoms/PressableIcon' 

import GlobalAspect from '../../../styles/GlobalAspect';
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
