import { generateId } from "./utilities";

/**
 * Generates a notify model with the given options.
 *
 * @param {string} type - Type of notification, can be 'info', 'success', 'warning', or 'error'.
 * @param {string} text - Text to display within the notification.
 * @param {object} options - Options for the notification.
 * @param {number} options.time - Duration in milliseconds before the notification automatically closes.
 * @param {string} options.timeFormat - Format of the time displayed in the timer, can be 'ms' or 's'.
 * @param {boolean} options.showTimer - Whether to display a countdown timer within the notification.
 * @param {string} options.timerPosition - Position of the timer within the notification, can be 'top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', or 'bottom-right'.
 * @param {function} handleClose - Function to call when the notification is closed.
 * @returns {object} - The generated notify model.
 */
export const notifyModel = ( type, text, options ) => {

  const { timeSettings, autoClose, showProgressBar, icon } = options
  
  const notify = {

    id: generateId(),
    type,
    text,
    showProgressBar: showProgressBar ?? true,
    autoClose: autoClose ?? true,
    icon: icon ?? type,

    timeSettings: {
      duration: timeSettings?.duration ?? (timeBy[type] ?? 4000),
      timeFormat: timeSettings?.timeFormat ?? 'ms',
      showTimer: timeSettings?.showTimer ?? false,
      timerPosition: timeSettings?.timerPosition ?? 'bottom-right',
    },

    state: {
      isOpen: true,
      isClosing: false,
      isOpening: true,
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