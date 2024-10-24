
import { 
  CheckIcon, 
  WarningCircleIcon, 
  CloseIcon, 
  WarningTriangleIcon, 
  WarningSquareIcon 
} from "./icons"
import { generateId } from "./utilities"
import useNotify from "./useNotify"

export const notifyType = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error'
}

export const iconType = {
  info: ( id ) => <WarningSquareIcon key={ id } id={ id } className="w-6 h-6 " />,
  success: ( id ) => <CheckIcon key={ id } id={ id } className="w-6 h-6 " />,
  warning: ( id ) => <WarningTriangleIcon key={ id } id={ id } className="w-6 h-6 " />,
  error: ( id ) => <WarningCircleIcon key={ id } id={ id } className="w-6 h-6 " />,
}


export const notifyMap = {
  [notifyType.info]: {
    bg: 'bg-blue-500',
    txtColor: 'text-white',
    iconNotify: ( icon, id ) => iconType[icon](id) || iconType.info(id)
  },
  [notifyType.success]: {
    bg: 'bg-emerald-500',
    txtColor: 'text-white',
    iconNotify: ( icon, id ) => iconType[icon](id) || iconType.success(id)
  },
  [notifyType.warning]: {
    bg: 'bg-orange-500',
    txtColor: 'text-white',
    iconNotify: ( icon, id ) => iconType[icon](id) || iconType.warning(id)
  },
  [notifyType.error]: { 
    bg: 'bg-rose-500',
    txtColor: 'text-white',
    iconNotify: ( icon, id ) => iconType[icon](id) || iconType.error(id)
  }
}

export const timerPositionMap = {
  'top-left': '-top-0.5 left-1',
  'bottom-left': '-bottom-0.5 left-1',
  'bottom-center': '-bottom-0.5 left-1/2 right-1/2 -translate-x-1/2 ',
  'bottom-right': '-bottom-0.5 right-1',
}
/**
 * Notification component that displays a message with optional auto-close and timer features.
 *
 * @param {object} props - The component props.
 * @param {string} props.id - Unique identifier for the notification.
 * @param {string} [props.type='info'] - Type of notification, can be 'info', 'success', 'warning', or 'error'.
 * @param {string} [props.text='Notify'] - Text to display within the notification.
 * @param {boolean} [props.autoClose=true] - Whether the notification should automatically close after a specified time, default is true.
 * @param {number} [props.time=4000] - Duration in milliseconds before the notification automatically closes, default is 4000 (4 seconds).
 * @param {boolean} [props.showTimer=false] - Whether to display a countdown timer within the notification, default is false.
 * @param {string} [props.timeFormat='ms'] - Format of the time displayed in the timer, can be 'ms' or 's', default is 'ms'.
 * @returns {ReactElement|null} - The rendered notification component or null if not open.
 */
export default function Notify( props ) {  

  const { 
    id = generateId(), 
    type = 'info', 
    text = 'Notify title', 
    icon = 'success',
    autoClose = true, 
    showProgressBar = true,
    timeSettings = {},
  } = props

  const { 
    time = 5000, 
    timeFormat = 'ms', 
    showTimer = false, 
    timerPosition = 'bottom-right' 
  } = timeSettings


  const { 
    isClosing, 
    isOpening,
    isOpen,
    handleClose,
    timer,
    progressBarTimer,
    pauseTimer,
    resumeTimer,
    pauseProgressBar,
    resumeProgressBar
  } = useNotify( id, autoClose, time, showTimer, timeFormat, showProgressBar )

  const { bg, txtColor, iconNotify } = notifyMap[type]



  const progressBar = () => {
    return (
        <div
          className={"absolute bottom-0 left-0 w-full h-1 bg-white/50 shadow"}
          style={{ width: `${(progressBarTimer / time) * 100}%` }}
        />
    )
  }

  const handlerPauseTime = () => {
    if( !autoClose )  return 
    pauseTimer()
    pauseProgressBar()
  }

  const handlerResumeTime = () => {
    if( !autoClose )  return 
    resumeTimer()
    resumeProgressBar()
  }



  return (
    
      isOpen
      ? (
          <div 
            key={ id }
            onMouseEnter={ handlerPauseTime }
            onMouseLeave={ handlerResumeTime }
            className={`Notify p-3  text-sm shadow-md shadow-black/60 relative w-[240px] min-h-[60px] max-h-[60px] flex justify-between  items-center gap-x-2 rounded-md pointer-events-auto z-50 duration-300 overflow-hidden 
            ${bg} ${txtColor}
            ${isClosing ? 'animate-[zoomOut_.6s_ease] opacity-0 mb-[-60px]' : 'animate-[zoomIn_.4s_ease] mb-2'}
            ${isOpening ? 'mb-[-60px]' : 'mb-2'}`}
            >
            <h1 className=" truncate"> { text } </h1>

            { iconNotify(icon, id+1) }


            <button onClick={ handleClose } className="absolute top-1 right-1 p-0.5 bg-gray-50/20 shadow  hover:bg-gray-50/40 rounded duration-300"> 
              <CloseIcon className="w-2 h-2 text-black/50" />
            </button>

  
            {
              autoClose && (
                <>
                  {showTimer && (
                    <div className={`TIMER text-white text-[.55rem] absolute ${timerPositionMap[timerPosition]}`}>
                      <span>{ timer > 0 ? timer + timeFormat: null } </span>
                    </div>
                  )}

                  { showProgressBar && progressBar() }
                </>
              )
            }

          </div>
        )
      : null
    
  )

}



