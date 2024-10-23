import { useEffect, useRef, useState } from "react"
import { useProvider } from "../../contexts/app-context/useProvider";
import { generateId } from "./utilities";

// const useNotify = ( id, autoClose, time, showTimer, timeFormat, showProgressBar ) => {

//   const { notifications, setNotifications } = useProvider()
//   const [isClosing, setIsClosing] = useState(false)
//   const [isOpen, setIsOpen] = useState(true)
//   const [content, setContent] = useState(null)
//   const [timer, setTimer] = useState( timeFormat === 'ms' ? time : time / 1000 );
//   const[progressBarTimer, setProgressBarTimer] = useState(time)


//   const notify = {
//     success: (text, options) => saveNotify('success', text, options),
//     info: (text, options) => saveNotify('info', text, options),
//     warning: (text, options) => saveNotify('warning', text, options),
//     error: (text, options) => saveNotify('error', text, options),
//     // custom: (text, customNotify) => saveNotify('custom', text, customNotify),
//   };
  
//   const generateNotify = (type, text, options = null) => {
//     return {
//       id: generateId(),
//       type, 
//       text,
//       showProgressBar: false,
//       autoClose: true,
//       showTimer: false,
//       icon: type, // Ajusta el icono según el tipo de notificación
//       ...options,
//     }
//   }
  
//   const saveNotify = (type, text, options = null) => {
//     const newNotify = generateNotify(type, text, options);
//     setNotifications((noties) => [newNotify, ...noties]);
//   }


//   const handleClose = () => {
//     setIsClosing(true)
//     setTimeout(() => {
//       setIsOpen(false)
//       removeNotify(id)
//     }, 300) // Eliminar notificación tras la animación
//   }
  

//   const removeNotify = ( id ) => {
//     setNotifications( notis => notis.filter(n => n.id !== id ) )
//   }



//   // If Notify shows timer
//   const updateTimer = () => {
//     if( showProgressBar ) smoothTimer(setProgressBarTimer)
//     if(!showTimer) return
//     smoothTimer(setTimer, timeFormat)
//   }

//   // let interval;
//   // const smoothTimer = (callback, format = 'ms') => {

//   //   const startTime = Date.now(); 
//   //   const endTime = startTime + time; // Tiempo en el que se debe cerrar la notificación
    
//   //   interval = setInterval(() => {
//   //     const now = Date.now();
//   //     let timeRemaining = Math.max(endTime - now, 0); // Calcula el tiempo restante
//   //     timeRemaining = format === 's' ? Math.round(timeRemaining / 1000) : timeRemaining

//   //     callback(timeRemaining)
  
//   //     if (timeRemaining <= 0) {
//   //       clearInterval(interval); 
//   //     }
//   //   }, format === 's' ? 1000 : 20); 
    
//   //   return () => clearInterval(interval); //Limpia cuando desmonta el componente
//   // }

//   const smoothTimer = (callback, format = 'ms') => {
//     let interval = null;
//     let paused = false;
//     let remainingTime = 0;
//     let startTime = Date.now();
//     let endTime = startTime + time; // Tiempo en el que se debe cerrar la notificación
    
//     const startInterval = () => {
//       interval = setInterval(() => {
//         if (!paused) {
//           const now = Date.now();
//           let timeRemaining = Math.max((remainingTime || endTime) - now, 0); // Calcula el tiempo restante
//           timeRemaining = format === 's' ? Math.round(timeRemaining / 1000) : timeRemaining;
//           callback(timeRemaining);
    
//           if (timeRemaining <= 0) {
//             clearInterval(interval);
//           }
//         }
//       }, format === 's' ? 1000 : 20); 
//     }
  
//     startInterval();
  
//     const pauseTimer = () => {
//       if (!paused) {
//         paused = true;
//         clearInterval(interval);
//         remainingTime = (remainingTime || endTime) - Date.now(); // Guarda el tiempo restante
//       }
//     };
  
//     const resumeTimer = () => {
//       if (paused) {
//         paused = false;
//         endTime = Date.now() + remainingTime; // Actualiza el tiempo de fin basado en lo que queda
//         startInterval();
//       }
//     };
  
//     const stopTimer = () => {
//       clearInterval(interval);
//     };
  
//     return {
//       stop: stopTimer, 
//       pause: pauseTimer, 
//       resume: resumeTimer,
//     }
//   }
  


//   useEffect(() => {
    
//     if( autoClose ) {
//       updateTimer()
//       setTimeout(() => {
//         setIsClosing(true)
//         setTimeout(() => {
//           setIsOpen(false)
//           handleClose()
//         }, 300)
//       }, time)
//     }

//   }, [])

//   return { 
//     isClosing, 
//     isOpen,
//     content, 
//     timer,
//     setTimer,
//     progressBarTimer,
    
//     // Functions
//     handleClose,
//     setContent, 
//     setIsOpen,
//     setIsClosing,
//     notify,
//     removeNotify,
//     notifications,
//   }


// }

// export default useNotify




 const useNotify = (id, autoClose, time, showTimer, timeFormat = 'ms', showProgressBar) => {
  const { notifications, setNotifications } = useProvider();
  const [isClosing, setIsClosing] = useState(false);
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
  
  const generateNotify = (type, text, options = null) => ({
    id: generateId(),
    type,
    text,
    showProgressBar: false,
    autoClose: true,
    showTimer: false,
    icon: type,
    ...options,
  });

  const saveNotify = (type, text, options = null) => {
    const newNotify = generateNotify(type, text, options);
    setNotifications((noties) => [newNotify, ...noties]);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      removeNotify(id);
    }, 300); // Tiempo para la animación de cierre
  };

  const removeNotify = (id) => {
    setNotifications((notis) => notis.filter((n) => n.id !== id));
  };

  // Función para manejar el smooth timer

  // const [timerControl, setTimerControl] = useState(null);
  // const [progressBarControl, setProgressBarControl] = useState(null);

  useEffect(() => {
    // Timer para el tiempo de la notificación
    timerControl.current = createTimer(time, setTimer, timeFormat) 

    // Timer para la barra de progreso
    progressBarControl.current = createTimer(time, setProgressBarTimer, 'ms') 

    return () => {
      timerControl?.current.stop();
      progressBarControl?.current.stop();
    };
  }, [time]);


  useEffect(() => {
    if (autoClose) {
      // updateTimer();
      const interval =setTimeout(() => {
        setIsClosing(true);
        setTimeout(() => {
          setIsOpen(false);
          handleClose();
        }, 300); // Tiempo de animación
      }, time)

      return () => clearInterval(interval)
    }

  }, []);

  return {
    isClosing,
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

    pauseTimer: () => timerControl.current.pause(),
    resumeTimer: () => timerControl.current.resume(),
    pauseProgressBar: () => progressBarControl.current.pause(),
    resumeProgressBar: () => progressBarControl.current.resume()

  };
};

export default useNotify;


const createTimer = (duration, callback, timeFormat = 'ms') => {
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
        callback(remainingTime);

        if (remainingTime <= 0) {
          clearInterval(interval);
        }
      }
    }, timeFormat === 's' ? 1000 : 20);
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
};
