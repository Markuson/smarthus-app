import React from 'react';
import { TouchableOpacity, Text, Vibration, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './CustomIcon.styles';

export type Props = {
  name: string;
  color: string | undefined;
  size: number | string | undefined;
};

const CustomIcon: React.FC<Props> = ({
  name,
  color,
  size,
}) => {
  const { icon } = styles;

  return (
    <View style={icon}>
      <Icon name={name} size={size? size : '20'} color={color? color : 'whitesmoke'} />
    </View>
  );
};

export default CustomIcon;
