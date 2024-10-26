import { createRef, useEffect, useRef, useState } from "react"
import { useProvider } from "../../contexts/app-context/useProvider";
import { generateId } from "./utilities";
import { notifyModel } from "./model";

//  const useNotify = ( localNotifyId, autoClose, time, timeFormat = 'ms', showProgressBar ) => {
  const useNotify = ( notification ) => {
  
  const { notifications, setNotifications } = useProvider();
  const [timer, setTimer] = useState(notification?.timeSettings?.duration);
  const timerControl = useRef(null);  // Referencia para el control del temporizador


  const notify = {
    success: (text, options) => saveNotify('success', text, options),
    info: (text, options) => saveNotify('info', text, options),
    warning: (text, options) => saveNotify('warning', text, options),
    error: (text, options) => saveNotify('error', text, options),
  }

  const saveNotify = (type, text, options = {}) => {
    const newNotify = {...notifyModel( type, text, options, handleClose )}
    
    setNotifications((noties) => [newNotify, ...noties])
    
    if ( notifications.length > 4 ) deleteQueue()

    return newNotify.id
  };


  const deleteQueue = () => {
    const excededQ = notifications.slice(4, notifications.length)
    excededQ.map( n => handleClose( n.id ) )
  }

  const handleClose = ( id ) => {

    setNotifications((notis) => notis.map( n => n.id === id ? { ...n, state: { ...n.state, isClosing: true } } : n ))
    setTimeout(() => {
      setNotifications((notis) => notis.map( n => n.id === id ? { ...n, state: { ...n.state, isOpen: false } } : n ))
      removeNotify( id );
    }, 300)

  };


  const removeNotify = (id) => setNotifications((notis) => notis.filter((n) => n.id !== id))


  useEffect(() => {

    const interval = setTimeout(() => {
      setNotifications((notis) => notis.map( n => n.id === notification?.id ? { ...n, state: { ...n.state, isOpening: false } } : n ))
    }, 0)

    // Timer para el tiempo de la notificación
    if ( notification?.autoClose ){
      timerControl.current =  createTimer(notification?.timeSettings?.duration, setTimer, handleClose, notification.id)

      return () => timerControl?.current?.stop()
    }

    return () => clearTimeout(interval)
  }, [])


  return {

    notify, //notify caller. example: notify.success( 'success message')
    handleClose,
    timer,
    notifications,
    setNotifications,

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
