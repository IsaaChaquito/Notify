import { useEffect, useRef, useState } from "react"
import { useProvider } from "../../context/useProvider";
import { notifyModel } from "./model";


/**
 * useNotify is a hook that manages the state of notifications.
 * It receives a notification object with the following properties:
 *   - id: a unique identifier for the notification
 *   - text: the text to be displayed in the notification
 *   - type: one of the following: 'info', 'success', 'warning', 'error', 'neutral', 'promise'
 *   - icon: the icon to be displayed in the notification
 *   - timeSettings: an object with the following properties:
 *     - duration: the time in milliseconds for the notification to be displayed
 *     - timeFormat: one of the following: 'ms' or 's'
 *     - showTimer: a boolean indicating whether to show the timer
 *     - timerPosition: one of the following: 'top-right', 'bottom-right', 'bottom-center', 'bottom-left', 'top-left', 'top-center'
 *   - autoClose: a boolean indicating whether the notification should be removed automatically
 *   - showProgressBar: a boolean indicating whether to show the progress bar
 *   - iconFirst: a boolean indicating whether the icon should be displayed first
 *   - filled: a boolean indicating whether the notification should be filled
 *   - animation: an object with the following properties:
 *     - entrance: the animation to be used for the entrance animation
 *     - exit: the animation to be used for the exit animation
 *
 * It returns an object with the following properties:
 *   - notify: an object with methods to add, update or remove notifications
 *   - handleClose: a function to close a notification
 *   - timer: the current timer value
 *   - notifyState: the current state of the notifications
 *   - notifyDispatch: the dispatch function to update the notifications state
 *   - setNotifiesPosition: a function to set the position of the notifications
 *   - pauseTimer: a function to pause the timer
 *   - resumeTimer: a function to resume the timer
 */

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
    update: ( notify ) => updateNotify( notify ),
    remove: ( id ) => handleClose( id ),
  }

  const saveNotify = (type, text, options = {}) => {

    const newNotify = {...notifyModel( type, text, options )}
    
    notifyDispatch({ type: 'ADD_NOTIFY', payload: newNotify })

    return newNotify
  }

  const updateNotify = ( notify ) => {
    notifyDispatch({ type: 'UPDATE_NOTIFY', payload: {...notify, isUpdating: true} })
  }
  const removeNotify = ( id ) => notifyDispatch({ type: 'REMOVE_NOTIFY', payload: id })

  const verifyLengthOfList = () => {
    if ( notifyState?.notifies?.length > notifyState?.maxLength ) {
      const excededQ = notifyState?.notifies.slice(notifyState?.maxLength, notifyState?.notifies?.length)
      excededQ.map( n => handleClose( n.id ) )
    }
  } 

  const setMaxLength = ( maxLength = 7 ) => {
    notifyDispatch({ type: 'SET_MAX_LENGTH', payload: maxLength })
  }

  const handleClose = ( id ) => {

    notifyDispatch({ type: 'IS_CLOSING_TRUE', payload: id })

    setTimeout(() => {
      notifyDispatch(({ type: 'IS_OPEN_FALSE', payload: id }))
      removeNotify( id );
    }, 300)

  };


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
    setMaxLength,

    notifyState, //notify state. example: notifyState.notifies, comes from notifyReducer
    notifyDispatch,

    setNotifiesPosition,

    pauseTimer: () => timerControl.current?.pause(),
    resumeTimer: () => timerControl.current?.resume(),
  }
}

export default useNotify;


/**
 * Crea un temporizador que se encarga de llamar a una función de
 * callback con el tiempo restante cada 20ms, y que se detiene
 * automáticamente cuando el tiempo restante es de 0ms.
 *
 * @param {number} duration - Tiempo total del temporizador en ms
 * @param {function} callback - Función que se llama cada 20ms con el
 *                              tiempo restante como parámetro
 * @param {function} handleClose - Función que se llama cuando el
 *                                 temporizador se detiene
 * @param {string} id - Identificador único para el temporizador
 *
 * @returns {object} - Objeto con tres métodos: pause, resume y stop.
 *                    pause: pausa el temporizador.
 *                    resume: reanuda el temporizador.
 *                    stop: detiene completamente el temporizador.
 */

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
