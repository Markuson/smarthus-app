import React from 'react';
import { Pressable, Vibration } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import GlobalAspect from '../../../styles/GlobalAspect';

export type Props = {
  name: string;
  onPress: any;
  size: 'big' | 'normal' | 'small';
  vibrate?: number;
};

const PressableIcon: React.FC<Props> = ({ name, onPress, size, vibrate }) => {
  const handlePress = () => {
    Vibration.vibrate(50);
    onPress();
  };
  const getSize = () => {
    switch (size) {
      case 'big':
        return GlobalAspect.font.size.big
      case 'small':
        return GlobalAspect.font.size.small
      default:
        return GlobalAspect.font.size.normal
    }
  }
  
  return (
    <Pressable onPress={() => handlePress()}>
      <Icon
        name={name}
        size={getSize()}
        color={GlobalAspect.color.pressableIcon}
      />
    </Pressable>
  );
};

export default PressableIcon;
