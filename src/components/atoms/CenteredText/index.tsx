import React from 'react';
import { Text, View } from 'react-native';
import styles from './CenteredText.styles';

export type Props = {
  text: string;
};

const CenteredText: React.FC<Props> = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};
export default CenteredText;
