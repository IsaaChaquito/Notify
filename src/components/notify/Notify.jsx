

import { CloseIcon } from "./icons"
import useNotify from "./useNotify"
import { notifyMap, timerPositionMap } from "./notifyTypes"
import { useEffect, useRef } from "react"



/**
 * A notification component that displays a notification message, icon and a close button.
 * When the notification is autoClosing, a timer is displayed and the notification is closed when it reaches 0.
 * When the notification is hovered, the close button and timer are displayed.
 * When the notification is clicked, the notification is removed.
 * When the notification is updated, the notification is re-rendered with the new props.
 * When the notification is removed, the notification is removed from the DOM.
 * @param {{ notification: { id: string, text: string, type: string, icon: string, showProgressBar: boolean, autoClose: boolean, filled: boolean, timeSettings: { duration: number, timerPosition: string, timeFormat: string, showTimer: boolean}, state: { isOpen: boolean, isClosing: boolean, isOpening: boolean }, isUpdating: boolean}}} props
 * @returns {JSX.Element}
 */
export default function Notify( { notification } ) {  

  const { 
    handleClose,
    timer,
    pauseTimer,
    resumeTimer,
  } = useNotify( notification )

  const { id, text, type, icon, iconFirst, showProgressBar, autoClose, filled, timeSettings, state, isUpdating, animation } = notification
  
  const { duration, timerPosition, timeFormat, showTimer } = timeSettings
  const { isOpen, isClosing, isOpening } = state
  const { bg, txtColor, iconNotify, progressBarColor, timerColor } = notifyMap[type]( filled, icon )  


  return (
    
      isOpen
      ? (
          <div 
            onMouseEnter={ () => autoClose && pauseTimer() }
            onMouseLeave={ () => autoClose && resumeTimer() }
            className={`Notify group h-[55px] p-2 text-sm shadow-md shadow-black/60 relative w-[240px] flex justify-between items-center gap-x-2 rounded-md pointer-events-auto select-none z-50  overflow-hidden duration-300 ${bg} ${txtColor} ${isClosing ? animation.exit + ' opacity-0'  : animation.entrance} `}
          >
            {/* ${isClosing ? animation.exit + ' opacity-0'  : animation.entrance} */}

{/* className={` will-change-transform group p-3 text-sm shadow-md shadow-black/60 relative w-[240px] min-h-[55px] max-h-[55px] flex justify-between items-center gap-x-2 rounded-md pointer-events-auto select-none z-50 duration-300 overflow-hidden ${bg} ${txtColor} ${isClosing ? animation.exit +' opacity-0 mb-[-55px]' : animation.entrance+''} ${isOpening ? 'mb-[-55px]' : 'mb-2'}`} */}
          
          <div className={`w-full flex items-center ${iconFirst ? 'flex-row-reverse justify-end' : 'justify-between '} gap-x-2`}>

            <h1 className={`h-auto overflow-hidden ${isUpdating ? 'animate-fade-in' : ''}  truncate duration-75`}>
              { text }
            </h1>

            { iconNotify }

          </div>

            <button 
              onClick={ () => handleClose( id ) } 
              className={`absolute top-1 right-1 p-0.5 ${filled ? 'bg-gray-50/20 hover:bg-gray-50/40' : 'bg-black/40 hover:bg-black/60'} opacity-0 group-hover:opacity-100 shadow rounded duration-300`}
            > 
              <CloseIcon className={`w-2 h-2 ${filled ? 'text-black/50' : 'text-white'}`} />
            </button>

  
            {
              autoClose && (
                <>
                  {showTimer && (
                    <div className={`TIMER ${timerColor} text-[.55rem] absolute ${timerPositionMap[timerPosition] ?? timerPositionMap['bottom-right']}`}>
                      <span>
                        { 
                          timer > 0 
                          ? (timeFormat === 's' ? Math.round(timer / 1000) : timer) + timeFormat
                          : null 
                        } 
                      </span>
                    </div>
                  )}

                  { showProgressBar && (
                    <div
                      className={`absolute bottom-0 left-0 w-full h-1 ${progressBarColor} shadow`}
                      style={{ width: `${(timer / duration) * 100}%` }}
                    />
                  )}

                </>
              )
            }

          </div>
        )
      : null
    
  )

}



