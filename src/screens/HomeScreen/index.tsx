import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Button from '../../components/Button';
import { styles } from '../../styles/GlobalStyles';
import aspect from '../../styles/GlobalAspect';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

export type Props = {
    theme: any;
};
const { color, dimension: { switchButton }, font, icon } = aspect

const HomeScreen: React.FC<Props> = ({
}) => {
    const [iconColor, setIconColor] = useState(color.icon.disabled)
    const handlePress = () => {
        iconColor === color.icon.enabled ? setIconColor(color.icon.disabled) : setIconColor(color.icon.enabled)
    }
    return (
        <View style={styles.appContainer}>
            <Button
                accessibilityLabel={'testButton'}
                buttonColor={color.button}
                buttonFontColor={color.textNormal}
                buttonFontFamily={font.light}
                buttonFontSize={font.size.big}
                buttonHeight={switchButton.height}
                buttonRadius={switchButton.radius}
                buttonWidth={switchButton.width}
                iconName={'lightbulb-outline'}
                iconColor={iconColor}
                iconSize={icon.size.big}
                onPress={() => handlePress()}
                title={'Light 1'}
            />
        </View>
    );
}

export default HomeScreen;