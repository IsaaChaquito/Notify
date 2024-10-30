import { generateId } from '../../utils/utilities'


/**
 * Creates a notification object with specified properties and default values.
 * 
 * @param {string} type - The type of the notification (e.g., info, success, warning, etc.).
 * @param {string} text - The text content of the notification.
 * @param {object} options - Additional options for the notification.
 * @param {object} options.timeSettings - Settings for the notification timer.
 * @param {number} options.timeSettings.duration - The duration of the notification in milliseconds.
 * @param {string} options.timeSettings.timeFormat - The format of the timer (e.g., 'ms' or 's').
 * @param {boolean} options.timeSettings.showTimer - Whether to display the timer.
 * @param {string} options.timeSettings.timerPosition - The position of the timer display.
 * @param {boolean} options.autoClose - Whether the notification should automatically close.
 * @param {boolean} options.showProgressBar - Whether to show a progress bar.
 * @param {string} options.icon - The icon to display with the notification.
 * @param {boolean} options.filled - Whether the notification should be filled style.
 * @param {string} options.id - The unique identifier for the notification.
 * 
 * @returns {object} The notification object with properties set based on the input parameters and defaults.
 */
export const notifyModel = ( type, text, options ) => {

  const { timeSettings, autoClose, showProgressBar, icon, filled, id } = options
  
  const notify = {

    id: id ?? generateId(),
    type,
    text,
    showProgressBar: showProgressBar ?? true,
    autoClose: autoClose ?? true,
    icon: icon ?? type,
    filled: filled ?? true,
    isUpdating: id ? true : false,

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