import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import aspect from '../../../../styles/GlobalAspect';
import styles from './TempCard.styles';
import Card from '../../../atoms/Card';

export type Props = {
  temperature: string;
  humidity?: string;
  name: string;
  onRename: () => void;
};

const {
  color,
  icon,
  dimension: {
    card: { height: h, width: w },
  },
} = aspect;

const TempCard: React.FC<Props> = ({
  humidity,
  temperature,
  name,
  onRename,
}) => {
  return (
    <Card
      accessibilityLabel={'TemperatureCard'}
      cardSize={{ w: w.w1h2, h: h.w1h2 }}
    >
      <View style={styles.topSection}>
        <View style={styles.row}>
          <TouchableWithoutFeedback onLongPress={onRename}>
            <Text numberOfLines={1} style={styles.nameText}>
              {name}
            </Text>
          </TouchableWithoutFeedback>
          <Icon
            name={'thermometer'}
            size={icon.size.normal}
            color={color.textNormal}
          />
        </View>
      </View>
      <View style={styles.middleSection}>
        <Text numberOfLines={1} style={styles.dataText}>
          {temperature} ºC
        </Text>
        {humidity && (
          <Text numberOfLines={1} style={styles.dataText}>
            {humidity} %
          </Text>
        )}
      </View>
      <View style={styles.bottomSection} />
    </Card>
  );
};
export default TempCard;
