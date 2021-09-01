import React from 'react';
import { Text, View } from 'react-native';
import {styles} from '../../styles/GlobalStyles';
import aspect from '../../styles/GlobalAspect';

export type Props = {
  theme: any;
};

const SettingsScreen: React.FC<Props> = ({
    theme
  }) => {
    return (
      <View style={styles.appContainer}>
        <Text style={{ color: aspect.color.textEmphasis }}>Settings</Text>
      </View>
    );
  }

  export default SettingsScreen;