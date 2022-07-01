import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp('0.1%'),
    marginVertical: hp('0.1%'),
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('1%'),
    elevation: 4,
    shadowColor: 'rgba(255, 255, 255, 0.38)',
    shadowOffset: { width: 5, height: 5 },
    overflow: 'hidden',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  text: {},
});

export default styles;
