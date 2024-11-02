import { useEffect, useRef, useState } from "react"
import { useProvider } from "../../contexts/app-context/useProvider";
import { notifyModel } from "./model";


  const useNotify = ( notification ) => {

  const { notifyState, notifyDispatch } = useProvider()
  const [timer, setTimer] = useState(notification?.timeSettings?.duration);
  const timerControl = useRef(null);  // Referencia para el control del temporizador

  const notify = {
    success: (text, options) => saveNotify('success', text, options),
    info: (text, options) => saveNotify('info', text, options),
    warning: (text, options) => saveNotify('warning', text, options),
    error: (text, options) => saveNotify('error', text, options),
    neutral: (text, options) => saveNotify('neutral', text, options),
    promise: (text, options) => saveNotify('promise', text, options),
  }

  const saveNotify = (type, text, options = {}) => {
    const newNotify = {...notifyModel( type, text, options )}
    
    notifyDispatch({ type: 'ADD_NOTIFY', payload: newNotify })

    return newNotify.id
  };


  const verifyLengthOfList = () => {
    if ( notifyState?.notifies?.length > notifyState?.maxLength ) {
      const excededQ = notifyState?.notifies.slice(notifyState?.maxLength, notifyState?.notifies?.length)
      excededQ.map( n => handleClose( n.id ) )
    }
  } 

  const handleClose = ( id ) => {

    notifyDispatch({ type: 'IS_CLOSING_TRUE', payload: id })

    setTimeout(() => {
      notifyDispatch(({ type: 'IS_OPEN_FALSE', payload: id }))
      removeNotify( id );
    }, 300)

  };


  const getNotify = ( id ) => {
    const notify = notifyState.notifies.find( n => n.id === id )
    // console.log(notify)
    // console.log(notifyState.notifies);
  }

  const updateNotify = ( notify ) => notifyDispatch({ type: 'UPDATE_NOTIFY', payload: notify }) 
  const removeNotify = ( id ) => notifyDispatch({ type: 'REMOVE_NOTIFY', payload: id })

  const setNotifiesPosition = ( position) => {
    notifyDispatch({ type: 'SET_NOTIFIES_POSITION', payload: position })
  }


  useEffect(() => {

    if ( !notification ) return

    verifyLengthOfList()

    setTimeout(() => {
      notifyDispatch({ type: 'IS_OPENING_FALSE', payload: notification.id })
    }, 0)
    
    if ( notification.autoClose ){
      // Timer para el tiempo de la notificación
      timerControl.current =  createTimer(notification.timeSettings.duration, setTimer, handleClose, notification.id)

      return () => timerControl.current.stop()
    }

  }, [notification?.autoClose, notification?.timeSettings?.duration, notification?.id])


  return {

    notify, //notify caller. example: notify.success( 'success message')
    handleClose,
    timer,

    notifyState, //notify state. example: notifyState.notifies, comes from notifyReducer
    notifyDispatch,

    setNotifiesPosition,
    getNotify,
    updateNotify,
    removeNotify,

    pauseTimer: () => timerControl.current?.pause(),
    resumeTimer: () => timerControl.current?.resume(),
  };
};

export default useNotify;


const createTimer = (duration, callback, handleClose, id) => {
  let interval = null;
  let remainingTime = duration;
  let paused = false;
  let startTime = Date.now();
  let endTime = startTime + duration;

  const start = () => {
    interval = setInterval(() => {
      if (!paused) {
        const now = Date.now();
        remainingTime = Math.max(endTime - now, 0);
        callback(remainingTime);

        if (remainingTime <= 0) {
          clearInterval(interval);
          handleClose( id )
        }
      }
    },  20);
  };

  const pause = () => {
    if (!paused) {
      paused = true;
      clearInterval(interval);
      remainingTime = endTime - Date.now();
    }
  };

  const resume = () => {
    if (paused) {
      paused = false;
      startTime = Date.now();
      endTime = startTime + remainingTime;
      start();
    }
  };

  const stop = () => clearInterval(interval);

  start(); // Inicia el temporizador al llamar a la función

  return { pause, resume, stop };
}
