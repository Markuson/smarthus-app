import { Appearance, Platform } from 'react-native';
import DeviceData from '../utils/DeviceData';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

let theme= Appearance.getColorScheme()

export default {
  color: theme === 'dark' ?
    {
      button: 'gray',
      background: 'rgba(36,37,38, 1)',
      border: 'darkslategray',
      card: 'rgba(24,25,26, 1)',
      icon:{
        disabled: 'lightgray',
        enabled: '#ffef96',
      },
      notification: 'red',
      primary: 'lightgreen',
      shadow: {
        elevation: 4,
        offset: { width: 5, height: 5 },
        blur: 15,
        color: 'rgba(255, 255, 255, 0.38)',
        opacity: 0.2,
      },
      textEmphasis: 'rgba(255, 255, 255, 0.87)',
      textNormal: 'rgba(255, 255, 255, 0.6)',
      textDisabled: 'rgba(255, 255, 255, 0.38)',
    }
    :
    {
      button: 'lightgray',
      background: 'whitesmoke',
      border: 'lightgray',
      card: 'snow',
      icon:{
        disabled: 'gray',
        enabled: '#ffef96',
      },
      notification: 'tomato',
      primary: 'darkolivegreen',
      text: 'rgb(24,25,26)',
      shadow: {
        elevation: 4,
        offset: { width: 5, height: 5 },
        blur: 15,
        color: 'rgba(102, 102, 102, 1)',
        opacity: 0.2,
      },
      textEmphasis: 'rgba(0, 0, 0, 0.87)',
      textNormal: 'rgba(0, 0, 0, 0.6)',
      textDisabled: 'rgba(0, 0, 0, 0.38)',
    },

  dimension: {
    fullWidth: wp('100%'),
    fullHeigth: hp('100%'),
    switchButton:{
      height: hp('10%'),
      width: wp('90%'),
      radius: hp('1%')

    }
  },
  font: {
    light: Platform.OS === 'android' ? 'Raleway-Light' : 'Avenir-Light',
    bold: Platform.OS === 'android' ? 'Raleway-Bold' : 'Avenir-Black',
    numericBold: Platform.OS === 'android' ? 'Roboto-Light' : 'Avenir-Light',
    numericLight: Platform.OS === 'android' ? 'Roboto-Bold' : 'Avenir-Black',
    size:{
      normal: hp('2.5%'),
      small: hp('1.5%'),
      big: hp('4%'),
    }
  },
  icon:{
    size: {
      normal: hp('3%'),
      small: hp('2%'),
      big: hp('6%'),
    }
  },
  padding: {
    big: hp('20%'),
    medium: hp('10%'),
    small: hp('15%'),
  },
  shadow: {
    elevation: 4,
    shadowOffset: { width: 5, height: 5 },
    shadowBlur: 15,
    shadowColor: '#666',
    shadowOpacity: 0.2,
  },
};
