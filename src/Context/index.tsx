import React, { useContext } from 'react';
import { smarthusDataType } from '../types';

export type ContextProps = {
  data: smarthusDataType;
  dispatch: any;
  state: any;
  getNetInfo: () => void;
  setNetInfo: (
    serverIp: string | undefined,
    ssid: string | undefined
  ) => Promise<void>;
  mqttPublish: (action: 'set' | 'rename', message: any) => Promise<void>;
};

const Context = React.createContext({});

export const ContextProvider: React.FC<ContextProps> = ({
  children,
  data,
  dispatch,
  state,
  getNetInfo,
  setNetInfo,
  mqttPublish,
}) => {
  return (
    <Context.Provider
      value={{
        data,
        state,
        dispatch,
        getNetInfo,
        setNetInfo,
        mqttPublish,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useGlobalContext = () => useContext(Context);
