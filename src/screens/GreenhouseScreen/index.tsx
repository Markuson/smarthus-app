import React from 'react';
import { Text, View } from 'react-native';
import styles from '../../styles/GlobalStyles';
import aspect from '../../styles/GlobalAspect';

const GreenhouseScreen: React.FC = () => {
  return (
    <View style={styles.appContainer}>
      <Text style={{ color: aspect.color.textEmphasis }}>Greenhouse</Text>
    </View>
  );
};

export default GreenhouseScreen;
