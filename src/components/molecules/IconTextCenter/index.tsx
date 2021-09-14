import React from 'react';
import { View } from 'react-native';
import Icon from '../../atoms/CustomIcon';
import CenteredText from '../../atoms/CenteredText';

import styles from './IconTextCenter.styles';

export type Props = {
  iconName: string;
  iconColor?: string;
  iconSize?: number | string | undefined;
  text: string;
};

const Button: React.FC<Props> = ({
  iconName,
  iconColor,
  iconSize,
  text,
}) => {
  const { container} = styles;

  return (
    <View style={container}>
      <Icon name={iconName} color={iconColor} size={iconSize} />
      <CenteredText text={text} />
    </View>
  );
};

export default Button;
