import { Platform } from 'react-native';
import DeviceData from '../utils/DeviceData';
import GlobalAspect from './GlobalAspect';

export default {
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 0 : 0,
  },

  appBody: {
    flex: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },

  appContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  appFooter: {
    flex: 1,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  appHeader: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: DeviceData.deviceWidth,
    paddingHorizontal: 10,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },

  linkText: {
    // color: GlobalAspect.colors.linkColor,
    fontFamily: GlobalAspect.fonts.light,
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: GlobalAspect.fonts.normalSize,
  },

  TextInfo: {
    // color: GlobalAspect.colors.grey,
    fontFamily: GlobalAspect.fonts.numericLight,
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: GlobalAspect.fonts.smallSize,
    textAlign: 'center',
  },
};
