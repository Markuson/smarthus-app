import { StyleSheet } from 'react-native'
import GlobalAspect from '../../styles/GlobalAspect'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp('0.1%'),
    marginVertical: hp('0.1%'),
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('3%') ,
    elevation: GlobalAspect.color.shadow.elevation,
    shadowColor: GlobalAspect.color.shadow.color,
    shadowOffset: GlobalAspect.color.shadow.offset,
    overflow:'hidden'
  },
  icon:{
    justifyContent: 'center',
    alignItems: 'center',
    width:"15%"
  },
  textContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    width:"85%"
  },
  text:{

  }
})

export default styles