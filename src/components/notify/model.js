import { createRef } from "react"
import generateId from "./id-generator"



/**
 * Creates a new notify object with the given properties.
 *
 * @param {string} type - One of the following: 'info', 'success', 'warning', 'error', 'neutral', 'promise'
 * @param {string} text - The text to be displayed in the notification
 * @param {{ id?: string, timeSettings?: { duration: number, timeFormat: string, showTimer?: boolean, timerPosition?: string }, autoClose?: boolean, showProgressBar?: boolean, icon?: string, iconFirst?: boolean, filled?: boolean, animation?: { entrance: string, exit: string } }} options
 * @param {{animation?: {entrance?: string, exit?: string}}} animation - An object containing the animation classes, can be CSS or Tailwindcss.
 * @returns {{ id: string, type: string, text: string, showProgressBar: boolean, autoClose: boolean, icon: string, iconFirst: boolean, isUpdating: boolean, animation: { entrance: string, exit: string }, timeSettings: { duration: number, timeFormat: string, showTimer: boolean, timerPosition: string }, state: { isOpen: boolean, isClosing: boolean, isOpening: boolean }}}}
 */
export const notifyModel = ( type, text, options = {} ) => {

  const { id, timeSettings, autoClose, showProgressBar, icon, iconFirst, filled, animation } = options

  const notify = {

    id: id ?? generateId(),
    type,
    text,
    showProgressBar: showProgressBar ?? true,
    autoClose: type === 'promise' ? false : ( autoClose ?? true ),
    icon: type === 'promise' ? 'promise' : ( icon ?? type ),
    iconFirst: iconFirst ?? false,
    filled: filled ?? true,
    isUpdating: id ? true : false,

    animation: {
      entrance: animation?.entrance ?? 'animate-[zoomIn_.4s_ease-in-out]',
      exit: animation?.exit ?? 'animate-[zoomOut_.4s_ease-in-out]',
    },

    timeSettings: {
      duration: timeSettings?.duration ?? (timeBy[type] ?? 4000),
      timeFormat: timeSettings?.timeFormat ?? 'ms',
      showTimer: timeSettings?.showTimer ?? false,
      timerPosition: timeSettings?.timerPosition ?? 'bottom-right',
    },

    state: {
      isOpen: true,
      isClosing: false,
    },

  }

  return notify
}


const timeBy = {
  info: 4000,
  success: 3000,
  warning: 5000,
  error: 5000,
}



const timeFormats = { ms: 'ms', s: 's' }

const booleans = { true: true, false: false }

export const types = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
  neutral: 'neutral',
  promise: 'promise',
}

const timerPositionMap = {
  'top-left': '-top-0.5 left-1',
  'bottom-left': '-bottom-0.5 left-1',
  'bottom-center': '-bottom-0.5 left-1/2 right-1/2 -translate-x-1/2 ',
  'bottom-right': '-bottom-0.5 right-1',
}

const animationOptions = {
  entrance: {
    'zoomIn': 'animate-[zoomIn_.3s_ease-in-out]', 
    'fadeInDown': 'animate-[fadeInDown_.4s_ease-in-out]',  
    'jump': 'animate-[jump_.3s_ease]', 
    'slideInBottom': 'animate-[slide-in-bottom_.3s_ease]', 
    'slideInTop': 'animate-[slide-in-top_.3s_ease]',
    'backInRight': 'animate-[backInRight_.4s_ease-in-out]',
    'backInDown': 'animate-[backInDown_.4s_ease-in-out]',
    'bounceIn': 'animate-[bounceIn_.4s_ease-in-out]',
  },
  exit: {
    'zoomOut': 'animate-[zoomOut_.4s_ease-in-out]', 
    'fadeOutDown': 'animate-[fadeOutDown_.6s_ease-in-out]', 
    'jump': 'animate-[jump_.3s_ease]', 
    'slideOutTop': 'animate-[slide-out-top_.3s_ease]', 
    'slideOutBottom': 'animate-[slide-out-bottom_.3s_ease]',
    'backOutRight': 'animate-[backOutRight_.4s_ease-in-out]',
    'backOutDown': 'animate-[backOutDown_.4s_ease-in-out]',
    'bounceOut': 'animate-[bounceOut_.4s_ease-in-out]',
  }
}


export const notifySetup = {
  type: types,
  showProgressBar: booleans,
  autoClose: booleans,
  icon: types,
  iconFirst: booleans,
  filled: booleans,

  animation: {
    entrance: animationOptions.entrance,
    exit: animationOptions.exit,
  },

  timeSettings: {
    timeFormat: timeFormats,
    showTimer: booleans,
    timerPosition: timerPositionMap,
  },
}