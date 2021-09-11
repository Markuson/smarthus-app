import React from 'react';
import { TouchableOpacity, Text, Vibration, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './Button.styles';

export type Props = {
  accessibilityLabel: string;
  buttonColor: string;
  buttonFontColor: string;
  buttonFontFamily: string;
  buttonFontSize: number | string;
  buttonHeight: number | string;
  buttonRadius: number | string;
  buttonWidth: number | string;
  iconName?: string;
  iconColor?: string;
  iconSize?: number | string;
  isDisabled?: boolean;
  onPress: () => any;
  title: string;
};

const Button: React.FC<Props> = ({
  accessibilityLabel,
  buttonColor,
  buttonFontColor,
  buttonFontFamily,
  buttonFontSize,
  buttonHeight,
  buttonRadius,
  buttonWidth,
  iconName,
  iconColor,
  iconSize,
  isDisabled = false,
  onPress,
  title,
}) => {
  const handlePress = () => {
    Vibration.vibrate(50);
    onPress();
  };

  const { button, icon, textContainer, text } = styles;

  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={() => handlePress()}
      style={[
        button,
        {
          height: buttonHeight,
          width: buttonWidth,
          borderRadius: buttonRadius,
          backgroundColor: buttonColor,
        },
      ]}
      accessible={true}
      testID={accessibilityLabel}
      accessibilityLabel={accessibilityLabel}
    >
      {!!iconName && (
        <View style={icon}>
          <Icon name={iconName} size={iconSize} color={iconColor} />
        </View>
      )}
      <View style={textContainer}>
        <Text
          style={[
            text,
            {
              color: buttonFontColor,
              fontFamily: buttonFontFamily,
              fontSize: buttonFontSize,
            },
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
