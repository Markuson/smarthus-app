import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import styles from '../../styles/GlobalStyles';
import aspect from '../../styles/GlobalAspect';

const GreenhouseScreen: React.FC = () => {
  return (
    <ImageBackground
      source={require('../../../assets/background3.png')}
      resizeMode="cover"
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ flex: 1, justifyContent: 'center' }}
    >
      <View style={styles.appContainer}>
        {/* <Text style={{ color: aspect.color.textEmphasis }}>Greenhouse</Text> */}
      </View>
    </ImageBackground>
  );
};

export default GreenhouseScreen;
