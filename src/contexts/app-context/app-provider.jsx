
import { createContext, useReducer, useState } from 'react';
import { useProvider } from './useProvider';
import notifyReducer from '../../components/notify/notifyReducer';

export const AppContext = createContext();


export const AppProvider = ({ children }) => {
  
  const [notifyState, notifyDispatch] = useReducer(notifyReducer);

  const [modal, setModal] = useState({
    content: null,
    isOpen: false,
    isClosing: false,
  })



  return (
    <AppContext.Provider value={
      { 
        notifyState,
        notifyDispatch,
        modal,
        setModal
      }
    }>
      {children}
    </AppContext.Provider>
  );
};
