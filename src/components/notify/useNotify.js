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

    if ( notifications.length > 4 ) {
      const id = notifications[notifications.length - 1].id
      handleClose( id )
    }
    
    setNotifications((noties) => [newNotify, ...noties])

    return newNotify.id
  };

  const handleClose = ( id ) => {

    setNotifications((notis) => notis.map( n => n.id === id ? { ...n, state: { ...n.state, isClosing: true } } : n ))
    setTimeout(() => {
      setNotifications((notis) => notis.map( n => n.id === id ? { ...n, state: { ...n.state, isOpen: false } } : n ))
      removeNotify( id );
    }, 300); // Tiempo para la animación de cierre

  };


  const removeNotify = (id) => {
    // console.log('deleting for nottis, ', id);
    setNotifications((notis) => notis.filter((n) => n.id !== id));
  };


  useEffect(() => {

    // const interval = setTimeout(() => setIsOpening(false), 0)
    const interval = setTimeout(() => setNotifications((notis) => notis.map( n => n.id === notification?.id ? { ...n, state: { ...n.state, isOpening: false } } : n )), 0)

    // Timer para el tiempo de la notificación
    if ( notification?.autoClose ){
      timerControl.current =  createTimer(notification?.timeSettings?.duration, setTimer, handleClose, notification.id)
      // setNotifications((notis) => notis.map( n => n.id === id ? { ...n, state: { ...n.state, isOpen: false } } : n ))

      // Timer para la barra de progreso
      // if(showProgressBar) progressBarControl.current = createTimer(time, setProgressBarTimer, 'ms', handleClose, localNotifyId) 

      return () => {
        timerControl?.current?.stop();
        // progressBarControl?.current?.stop();
      };
    }

    return () => clearTimeout(interval)
  }, [])


  return {

    notify,
    // removeNotify,
    handleClose,
    timer,
    notifications,
    setNotifications,


    pauseTimer: () => timerControl.current?.pause(),
    resumeTimer: () => timerControl.current?.resume(),
    // pauseProgressBar: () => progressBarControl.current?.pause(),
    // resumeProgressBar: () => progressBarControl.current?.resume()

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
        // remainingTime = timeFormat === 's' ? Math.round(remainingTime / 1000) : remainingTime;
        callback(remainingTime);

        if (remainingTime <= 0) {
          console.log('removing: ', id);
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
