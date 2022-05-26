import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import aspect from '../../../styles/GlobalAspect';

const {
  color,
  dimension: { card },
  font,
  icon,
} = aspect;

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    backgroundColor: color.card,
    borderRadius: card.radius,
    height: card.height,
    width: card.width,
    margin: wp('0.8%'),
    elevation: 4,
    shadowColor: 'rgba(255, 255, 255, 0.38)',
    shadowOffset: { width: 5, height: 5 },
    overflow: 'hidden',
  }
});

export default styles;
