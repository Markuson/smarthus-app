import { Platform } from 'react-native';
import DeviceData from '../utils/DeviceData';

export default {
  lightTheme: {
    background: 'whitesmoke',
    border: 'darkgray',
    card: 'lightgray',
    disabled: 'gray',
    enabled: ' yellow',
    notification: 'tomato',
    primary: 'darkolivegreen',
    text: 'rgb(24,25,26)',
  },
  darkTheme: {
    background: 'rgb(36,37,38)',
    border: 'darkslategray',
    card: 'rgb(24,25,26)',
    disabled: 'gray',
    enabled: ' yellow',
    notification: 'red',
    primary: 'green',
    text: 'whitesmoke',
  },
  dimensions: {
    fullWidth: DeviceData.deviceWidth,
    fullHeigth: DeviceData.deviceHeight,
  },
  fonts: {
    light: Platform.OS === 'android' ? 'Raleway-Light' : 'Avenir-Light',
    bold: Platform.OS === 'android' ? 'Raleway-Bold' : 'Avenir-Black',
    numericBold: Platform.OS === 'android' ? 'Roboto-Light' : 'Avenir-Light',
    numericLight: Platform.OS === 'android' ? 'Roboto-Bold' : 'Avenir-Black',
    normalSize: 20,
    smallSize: 10,
    bigSize: 30,
    bigIcon: 40,
  },
  paddings: {
    big: 40,
    medium: 20,
    small: 10,
  },
  shadow: {
    elevation: 4,
    shadowOffset: { width: 5, height: 5 },
    shadowBlur: 15,
    shadowColor: '#666',
    shadowOpacity: 0.2,
  },
};
