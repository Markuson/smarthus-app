export const initialState: any = {
  homeNetwork: {
    ssid: 'undefined',
    serverIp: '0.0.0.0',
  },
  notAtHome: true,
  ssid: '',
  tradfri: {
    data: [],
    timestamp: '',
  },
  greenhouse: {},
};

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_ACTUAL_SSID':
      return {
        ...state,
        ssid: action.payload,
      };
    case 'SET_HOME_NETWORK':
      return {
        ...state,
        homeNetwork: action.payload,
      };
    case 'SET_NOT_AT_HOME':
      return {
        ...state,
        notAtHome: action.payload,
      };
    case 'SET_TRADFRI_DATA':
      return {
        ...state,
        tradfri: action.payload,
      };
    // case 'GREENHOUSE':
    //   return {
    //     ...state,
    //   };
    default:
      return state;
  }
};
