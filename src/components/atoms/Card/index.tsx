import React from 'react';
import { TouchableOpacity, Text, Vibration, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './Card.styles';


export type Props = {
  accessibilityLabel: string;
  children: any;
  cardSize: {
    h: number;
    w: number;
  };
};

const Card: React.FC<Props> = ({ accessibilityLabel, cardSize, children }) => {
  const { card } = styles;

  return (
    <View
      style={[card, { height: cardSize.h, width: cardSize.w }]}
      accessible={true}
      testID={accessibilityLabel}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </View>
  );
};

export default Card;
