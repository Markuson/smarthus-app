import React from 'react';
import { Text, View } from 'react-native';
import aspect from '../../../styles/GlobalAspect';
import styles from './Subtitle.styles';

export type Props = {
  text: string;
};

const Subtitle: React.FC<Props> = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};
export default Subtitle;
