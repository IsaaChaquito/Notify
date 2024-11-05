
import { createContext, useReducer } from 'react';
import notifyReducer from '../components/notify/notifyReducer';

export const AppContext = createContext();


/**
 * AppProvider component that initializes the application context and provides 
 * it to its children. It manages notification state using a reducer and modal 
 * state using useState. The context value includes notification state and dispatch 
 * functions, as well as modal state and its setter function.
 * 
 * @param {object} props - The component props.
 * @param {ReactNode} props.children - The child components that will have access 
 * to the AppContext.
 * 
 * @returns {JSX.Element} A context provider component that wraps its children 
 * with the AppContext.
 */
export const AppProvider = ({ children }) => {
  
  const [notifyState, notifyDispatch] = useReducer(notifyReducer);

  return (
    <AppContext.Provider value={
      { 
        notifyState,
        notifyDispatch,
      }
    }>
      {children}
    </AppContext.Provider>
  );
};
