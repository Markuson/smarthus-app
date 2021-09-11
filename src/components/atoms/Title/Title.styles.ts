import { StyleSheet } from 'react-native';
import GlobalAspect from '../../../styles/GlobalAspect';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    marginTop: hp('2%'),
    paddingVertical: hp('0.5%'),
    width: wp('95%'),
    fontFamily: GlobalAspect.font.bold,
    borderBottomColor: GlobalAspect.color.textNormal,
    borderBottomWidth: 1,
  },
  text: {
    color: GlobalAspect.color.textNormal,
    fontFamily: GlobalAspect.font.bold,
    fontSize: GlobalAspect.font.size.normal,
  },
});

export default styles;
