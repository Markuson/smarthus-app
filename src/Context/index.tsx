import React from 'react';
import { initialState, reducer } from '../redux';

export type Props = {
  dispatch: any;
  state: any;
  getNetInfo: any;
  wsSendData: any;
  setNetInfo: any;
};

export const Context = React.createContext({});

export const ContextProvider: React.FC<Props> = ({
  children,
  dispatch,
  state,
  getNetInfo,
  wsSendData,
  setNetInfo,
}) => {
  return (
    <Context.Provider
      value={{
        state,
        dispatch,
        getNetInfo,
        wsSendData,
        setNetInfo,
      }}
    >
      {children}
    </Context.Provider>
  );
};
