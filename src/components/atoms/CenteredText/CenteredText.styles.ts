import { StyleSheet } from 'react-native';
import GlobalAspect from '../../../styles/GlobalAspect';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent:'center',
    width: '100%',
    paddingHorizontal: wp('5%'),
    paddingTop: hp('1%'),
  },
  text: {
    color: GlobalAspect.color.textNormal,
    fontFamily: GlobalAspect.font.light,
    fontSize: GlobalAspect.font.size.small,
  },
});

export default styles;
