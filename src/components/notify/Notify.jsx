
import { useEffect, useState } from "react"
import { 
  CheckIcon, 
  WarningCircleIcon, 
  CloseIcon, 
  WarningTriangleIcon, 
  WarningSquareIcon, 
  ExclamationIcon,
  LoaderIcon
} from "./icons"

import useNotify from "./useNotify"
import { notifyMap, timerPositionMap } from "./notifyTypes"



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

  const { id, text, type, icon, showProgressBar, autoClose, filled, timeSettings, state, isUpdating } = notification
  const { duration, timerPosition, timeFormat, showTimer } = timeSettings
  const { isOpen, isClosing, isOpening } = state
  const { bg, txtColor, iconNotify, progressBarColor, timerColor } = notifyMap[type]( filled, icon )

  return (
    
      isOpen
      ? (
          <div 
            key={ id }
            onMouseEnter={ () => autoClose && pauseTimer() }
            onMouseLeave={ () => autoClose && resumeTimer() }
            className={`Notify group p-3 text-sm shadow-md shadow-black/60 relative w-[240px] min-h-[55px] max-h-[55px] flex justify-between items-center gap-x-2 rounded-md pointer-events-auto select-none z-50 duration-300 overflow-hidden 
            ${bg} ${txtColor}
            ${isClosing ? 'animate-[zoomOut_.4s_ease] opacity-0 mb-[-55px]' : 'animate-[zoomIn_.4s_ease] mb-2'}
            ${isOpening ? 'mb-[-55px]' : 'mb-2'}`}
            >
            <h1 className={`${isUpdating ? 'animate-fade-in' : ''}  truncate duration-75`}> { text } </h1>

            { iconNotify }


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



