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
  homeNetwork: {
    serverIp: string;
    ssid: string;
  };
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
          onPress: () => onSetNetInfo(undefined, actualSsid),
        },
      ]
    );
  };

  const PromptChangeIp = () => {
    prompt(
      'Server ip:',
      'Enter the ip of your home server.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: ip => onSetNetInfo(ip),
        },
      ],
      {
        cancelable: true,
        placeholder: '192.168.XXX.XXX',
      }
    );
  };

  return (
    <View style={GlobalStyles.smallContainer}>
      <Title text={'Network:'} />
      <View style={GlobalStyles.mediumContainer}>
        <View style={GlobalStyles.container}>
          <View style={GlobalStyles.textLine}>
            <Text style={styles.text}>Your actual network: </Text>
            <Text style={styles.text}>{actualSsid}</Text>
          </View>
        </View>
        <View style={GlobalStyles.container}>
          <View style={GlobalStyles.textLine}>
            <Text style={styles.text}>Your home network: </Text>
            <Text style={styles.text}>{homeNetwork.ssid}</Text>
          </View>
        </View>
        <View style={GlobalStyles.smallContainer}>
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
      <View style={GlobalStyles.mediumContainer}>
        <View style={GlobalStyles.container}>
          <View style={GlobalStyles.textLine}>
            <Text style={styles.text}>Your server Ip: </Text>
            <Text style={styles.text}>{homeNetwork.serverIp}</Text>
          </View>
        </View>
        <View style={GlobalStyles.smallContainer}>
          <Button
            accessibilityLabel={'changeIpButton'}
            buttonColor={color.button}
            buttonFontColor={color.textNormal}
            buttonFontFamily={font.light}
            buttonFontSize={font.size.small}
            buttonHeight={netSettingsButton.height}
            buttonRadius={netSettingsButton.radius}
            buttonWidth={netSettingsButton.width}
            onPress={() => PromptChangeIp()}
            title={'Set IP'}
          />
        </View>
      </View>
    </View>
  );
};

export default NetworkSettings;
