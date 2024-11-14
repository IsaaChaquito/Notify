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
export const notifyModel = ( type, text, options ) => {

  const { id, timeSettings, autoClose, showProgressBar, icon, iconFirst, filled, animation } = options

  const notify = {

    id: id ?? generateId(),
    type,
    text,
    showProgressBar: showProgressBar ?? true,
    autoClose: type === 'promise' ? false : ( autoClose ?? true ),
    icon: icon ?? type,
    iconFirst: iconFirst ?? false,
    filled: filled ?? true,
    isUpdating: id ? true : false,

    animation: {
      entrance: animation?.entrance ?? 'animate-[fadeInDown_.4s_ease-in-out]',
      exit: animation?.exit ?? 'animate-[fadeOutDown_.4s_ease-in-out]',
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

    // nodeRef: createRef(null),

  }

  return notify
}


const timeBy = {
  info: 4000,
  success: 3000,
  warning: 5000,
  error: 5000,
}