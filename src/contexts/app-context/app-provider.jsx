
import { createContext, useState } from 'react';

export const AppContext = createContext();


export const AppProvider = ({ children }) => {
  
  const [notifications, setNotifications] = useState([])
  const [modal, setModal] = useState({
    content: null,
    isOpen: false,
    isClosing: false,
  })



  return (
    <AppContext.Provider value={
      { 
        notifications, 
        setNotifications,
        modal,
        setModal
      }
    }>
      {children}
    </AppContext.Provider>
  );
};
