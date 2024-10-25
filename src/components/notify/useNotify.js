import { useEffect, useRef, useState } from "react"
import { useProvider } from "../../contexts/app-context/useProvider";
import { generateId } from "./utilities";

 const useNotify = ( localNotifyId, autoClose, time, timeFormat = 'ms', showProgressBar ) => {
  
  const { notifications, setNotifications } = useProvider();
  
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [content, setContent] = useState(null);
  const [timer, setTimer] = useState(timeFormat === 'ms' ? time : time / 1000);
  const [progressBarTimer, setProgressBarTimer] = useState(time);

  const timerControl = useRef(null);  // Referencia para el control del temporizador
  const progressBarControl = useRef(null);


  const notify = {
    success: (text, options) => saveNotify('success', text, options),
    info: (text, options) => saveNotify('info', text, options),
    warning: (text, options) => saveNotify('warning', text, options),
    error: (text, options) => saveNotify('error', text, options),
  };
  
  const generateNotify = (type, text, options = null) => (
    {
      id: generateId(),
      // nodeRef: createRef(null),
      type,
      text,
      showProgressBar: true,
      autoClose: true,
      showTimer: false,
      icon: type,
      ...options,
    }
  )

  const saveNotify = (type, text, options = null) => {
    const newNotify = generateNotify(type, text, options);
    if ( notifications.length > 4 ) setNotifications( noties => noties.slice(0, 4) )
    // if ( notifications.length > 4 ) {
    //   const id = notifications[notifications.length - 1].id;
    //   handleClose( id );
    // }

    // while( notifications.length > 4 ){
    //   const id = notifications[notifications.length - 1]?.id;
    //   handleClose( id );
    //   console.log('toy enciclao ayuaaaaaaaaaaa');
    // }

    setNotifications((noties) => [newNotify, ...noties]);
  };

  const handleClose = ( id ) => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      removeNotify( localNotifyId || id );
    }, 300); // Tiempo para la animación de cierre
  };


  const removeNotify = (id) => {
    console.log('deleting for nottis, ', id);
    // console.log('length ', notifications.length);
    setNotifications((notis) => notis.filter((n) => n.id !== id));
  };

  // const deleteOverFlowNotis = ( id ) => {
  //   setIsClosing(true);
  //   setTimeout(() => {
  //     setIsOpen(false);
  //     removeNotify( id );
  //   }, 0); // Tiempo para la animación de cierre
  // }

  // useEffect(() => {
  //   console.log('length ', notifications.length);

  //   if (notifications.length > 4) {
  //     const id = notifications[notifications.length - 1].id
  //     // console.log('id', id);
  //     // console.log('notifications', notifications);
  //     deleteOverFlowNotis( id )
  //   }
  // },[notifications])


  useEffect(() => {

    const interval = setTimeout(() => setIsOpening(false), 0)

    // Timer para el tiempo de la notificación
    if ( autoClose ){
      timerControl.current = createTimer(time, setTimer, timeFormat, handleClose, localNotifyId) 

      // Timer para la barra de progreso
      if(showProgressBar) progressBarControl.current = createTimer(time, setProgressBarTimer, 'ms', handleClose, localNotifyId) 

      return () => {
        timerControl?.current?.stop();
        progressBarControl?.current?.stop();
      };
    }

    return () => clearTimeout(interval)
  }, [])


  return {
    isClosing,
    isOpening,
    isOpen,
    content,
    timer,
    setTimer,
    progressBarTimer,
    handleClose,
    setContent,
    setIsOpen,
    setIsClosing,
    notify,
    removeNotify,
    notifications,
    setNotifications,


    pauseTimer: () => timerControl.current?.pause(),
    resumeTimer: () => timerControl.current?.resume(),
    pauseProgressBar: () => progressBarControl.current?.pause(),
    resumeProgressBar: () => progressBarControl.current?.resume()

  };
};

export default useNotify;


const createTimer = (duration, callback, timeFormat = 'ms', handleClose, localNotifyId) => {
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
        remainingTime = timeFormat === 's' ? Math.round(remainingTime / 1000) : remainingTime;
        // stop();
        callback(remainingTime);

        if (remainingTime <= 0) {
          clearInterval(interval);
          handleClose( localNotifyId );
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
