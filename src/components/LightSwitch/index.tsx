import React from 'react';
import aspect from '../../styles/GlobalAspect';
import Button from '../Button';

export type Props = {
  lightStatus: boolean;
  name: string;
  onPress: any;
};

const {
  color,
  dimension: { switchButton },
  font,
  icon,
} = aspect;

const LightSwitch: React.FC<Props> = ({ lightStatus, name, onPress }) => {
  return (
    <Button
      accessibilityLabel={'testButton'}
      buttonColor={color.button}
      buttonFontColor={color.textNormal}
      buttonFontFamily={font.light}
      buttonFontSize={font.size.big}
      buttonHeight={switchButton.height}
      buttonRadius={switchButton.radius}
      buttonWidth={switchButton.width}
      iconName={'lightbulb'}
      iconColor={lightStatus ? color.icon.enabled : color.icon.disabled}
      iconSize={icon.size.big}
      onPress={() => onPress()}
      title={name}
    />
  );
};
export default LightSwitch;
