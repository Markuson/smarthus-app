import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import aspect from '../../../styles/GlobalAspect';
import styles from './TempCard.styles';
import Card from '../../atoms/Card';

export type Props = {
  temperature: string;
};

const { color, dimension, font, icon } = aspect;

const TempCard: React.FC<Props> = ({ temperature }) => {
  return (
    <Card accessibilityLabel={'TemperatureCard'}>
      <View style={styles.topSection}>
        <View style ={styles.row}>
          <Text style={styles.nameText}>Name</Text>
          <Icon
            name={'thermometer'}
            size={icon.size.normal}
            color={color.textNormal}
          />
        </View>
      </View>
      <View style={styles.middleSection}>
        <Text style={styles.tempText}>{temperature} ºC</Text>
      </View>
      <View style={styles.bottomSection}/>
    </Card>
  );
};
export default TempCard;
