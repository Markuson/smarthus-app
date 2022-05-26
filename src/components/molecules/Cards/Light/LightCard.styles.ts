import { StyleSheet } from 'react-native';
import GlobalAspect from '../../../../styles/GlobalAspect';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const { color, font } = GlobalAspect;
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
  },
  text: {
    color: color.textNormal,
    fontFamily: font.light,
    fontSize: font.size.big,
  },
  switch: {
    width: wp('5%')
  },
});

export default styles;
