import { StyleSheet } from 'react-native';
import GlobalAspect from '../../../styles/GlobalAspect';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  centeredView: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    paddingTop: hp('0.5%'),
    paddingHorizontal: hp('0.5%'),
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingTop: hp('1%'),
    paddingBottom: hp('2%'),
  },
  modalView: {
    margin: wp('8%'),
    paddingTop: hp('1%'),
    backgroundColor: GlobalAspect.color.card,
    borderRadius: wp('2%'),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: hp('20%'),
  },
  scrollView:{
    width: '90%',
    marginHorizontal: wp('2%'),
    marginBottom: hp('1%'),
  },
  text: {
    color: GlobalAspect.color.textNormal,
    fontFamily: GlobalAspect.font.bold,
    fontSize: GlobalAspect.font.size.normal,
  },
});

export default styles;
