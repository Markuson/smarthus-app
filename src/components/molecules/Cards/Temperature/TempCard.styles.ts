import { StyleSheet } from 'react-native';
import GlobalAspect from '../../../../styles/GlobalAspect';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const { color, font } = GlobalAspect;
const styles = StyleSheet.create({
  nameText: {
    color: color.textNormal,
    fontFamily: font.light,
    fontSize: font.size.normal,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: wp('3%'),
    paddingTop: wp('2%'),
    width: '100%',
  },
  dataText: {
    color: color.textNormal,
    fontFamily: font.numericLight,
    fontSize: font.size.medium,
    paddingLeft: wp('3%'),
  },
  topSection: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  middleSection: {
    flex: 3,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  bottomSection: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
