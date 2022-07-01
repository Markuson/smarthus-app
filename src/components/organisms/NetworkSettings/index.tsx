import React from 'react';
import { Alert, Text, View } from 'react-native';
import prompt from 'react-native-prompt-android';

import GlobalStyles from '../../../styles/GlobalStyles';
import aspect from '../../../styles/GlobalAspect';
import styles from './NetworkSettings.styles';

import Title from '../../atoms/Title';
import Button from '../../molecules/Button';

const {
  color,
  dimension: { netSettingsButton },
  font,
} = aspect;

export type Props = {
  actualSsid: string;
  homeNetwork: string;
  onSetNetInfo: any;
};

const NetworkSettings: React.FC<Props> = ({
  actualSsid,
  homeNetwork,
  onSetNetInfo,
}) => {
  const setNetwork = () => {
    Alert.alert(
      'Set Home Network:',
      `Are you sure do you want to set ${actualSsid} as your home network? `,
      [
        {
          text: 'NO',
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => onSetNetInfo(actualSsid),
        },
      ]
    );
  };

  return (
    <View>
      <View style={GlobalStyles.container}>
        <Title text={'Home Network:'} />
        <View style={GlobalStyles.textLine}>
          <Text style={styles.text}>Your actual network: </Text>
          <Text style={styles.text}>{actualSsid}</Text>
        </View>
        <View style={GlobalStyles.textLine}>
          <Text style={styles.text}>Your home network: </Text>
          <Text style={styles.text}>{homeNetwork}</Text>
        </View>
      </View>
      <View style={GlobalStyles.alignCenter}>
        <Button
          accessibilityLabel={'setNetworkButton'}
          buttonColor={color.button}
          buttonFontColor={color.textNormal}
          buttonFontFamily={font.light}
          buttonFontSize={font.size.small}
          buttonHeight={netSettingsButton.height}
          buttonRadius={netSettingsButton.radius}
          buttonWidth={netSettingsButton.width}
          onPress={() => setNetwork()}
          title={'Set Network'}
        />
      </View>
    </View>
  );
};

export default NetworkSettings;
