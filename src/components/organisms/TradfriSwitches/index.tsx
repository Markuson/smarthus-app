import React from 'react';
import { View } from 'react-native';

import Loading from '../../atoms/Loading';
import LightSwitch from '../../molecules/LightSwitch';
import IconTextCenter from '../../molecules/IconTextCenter';
import HeaderButtons from '../../molecules/HeaderButtons';

import GlobalStyles from '../../../styles/GlobalStyles';

import GlobalAspect from '../../../styles/GlobalAspect';

export type Props = {
  notAtHome: boolean;
  onPress: any;
  onRefresh: any;
  tradfriData: any
};

const TradfriSwitches: React.FC<Props> = ({notAtHome, onPress, onRefresh, tradfriData}) => {
  return (
      <View style={GlobalStyles.container}>
        <HeaderButtons onRefresh={() => onRefresh()} vibrateTime={50} />
        <View style={GlobalStyles.homeContainer}>
          {notAtHome ?
            <IconTextCenter
            iconName={'lightbulb-off'}
            iconColor={GlobalAspect.color.icon.disabled}
            iconSize={GlobalAspect.icon.size.big}
            text={'Not conected to home network'} />
            :
            tradfriData.length > 0 ? (
              tradfriData.map((element: any, index: any) => {
                if (element.type.includes('TRADFRI') && element.label) {
                  return (
                    <LightSwitch
                      key={index}
                      isDisabled={notAtHome}
                      lightStatus={element.on}
                      name={element.label}
                      onPress={() => onPress(element)}
                    />
                  );
                }
              })
            ) : (
              <Loading size="large" />
            )}
        </View>
      </View>
  );
};

export default TradfriSwitches;
