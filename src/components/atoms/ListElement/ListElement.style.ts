import { StyleSheet } from 'react-native';
import GlobalAspect from '../../../styles/GlobalAspect';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: GlobalAspect.color.button,
    borderBottomColor: GlobalAspect.color.textDisabled,
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: hp('5%'),
    paddingHorizontal: '5%',
    paddingTop: '2%',
    paddingBottom: '1%',
    width: '90%',
  },
  textLine: {
    alignContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  id: {
    color: GlobalAspect.color.textNormal,
    fontFamily: GlobalAspect.font.light,
    fontSize: GlobalAspect.font.size.normal,
  },
  name: {
    color: GlobalAspect.color.textEmphasis,
    fontFamily: GlobalAspect.font.light,
    fontSize: GlobalAspect.font.size.normal,
  },
  noname: {
    color: GlobalAspect.color.textDisabled,
    fontFamily: GlobalAspect.font.light,
    fontSize: GlobalAspect.font.size.normal,
  },
});

export default styles;
