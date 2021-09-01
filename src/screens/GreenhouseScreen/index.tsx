import React from 'react';
import { Text, View } from 'react-native';
import { styles} from '../../styles/GlobalStyles';
import aspect from '../../styles/GlobalAspect';

export type Props = {
  theme: any;
};

const GreenhouseScreen: React.FC<Props> = ({
    theme
  }) => {
    return (
      <View style={styles.appContainer}>
        <Text style={{ color: aspect.color.textEmphasis }}>Greenhouse</Text>
      </View>
    );
  }

  export default GreenhouseScreen;