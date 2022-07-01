import React from 'react';
import { View } from 'react-native';
import prompt from 'react-native-prompt-android';

import ListElement from '../../atoms/ListElement';
import Subtitle from '../../atoms/Subtitle';
import Title from '../../atoms/Title';
import Loading from '../../atoms/Loading';
import IconTextCenter from '../../molecules/IconTextCenter';

import GlobalAspect from '../../../styles/GlobalAspect';
import GlobalStyles from '../../../styles/GlobalStyles';
export type Props = {
  devices: any;
  notAtHome: boolean;
  onNameChange: any;
};

const TradfriSettings: React.FC<Props> = ({ devices, notAtHome, onNameChange }) => {
  const PromptNameChange = (id: string, label: string | undefined) => {
    prompt(
      'Enter new name:',
      `Enter the name you want to put to the device ${id}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: name => handleNameChange(id, name),
        },
      ],
      {
        cancelable: true,
        defaultValue: label ? label : undefined,
        placeholder: label ? label : 'New name',
      }
    );
  };

  const handleNameChange = (id: string, newName: string) => {
    onNameChange(id, newName);
  };

  return (
    <View style={GlobalStyles.mediumContainer}>
      <Title text={'Tradfri:'} />
      <View style={GlobalStyles.smallContainer}>
        <Subtitle text={'Press any device to rename it:'} />
        <View style={GlobalStyles.smallContainer}>
          {notAtHome ?
            <IconTextCenter
              iconName={'lightbulb-off'}
              iconColor={GlobalAspect.color.icon.disabled}
              iconSize={GlobalAspect.icon.size.normal}
              text={'Not conected to home network'} />
            :
          devices?
            devices.map((device: any, index: any) => {
              return (
                <ListElement
                  key={index}
                  name={device.label ? device.label : 'unnamed'}
                  id={device.id}
                  onPress={() => PromptNameChange(device.id, device.label)}
                />
              );
            })
          :
          <Loading size="large"/>
          }
        </View>
      </View>
    </View>
  );
};

export default TradfriSettings;
