

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

  const notificationRef = useRef(null);

  useEffect(() => {
    if (!notificationRef.current) return; // Salir si el ref no está adjunto
  
    let start = null;
    // const initialMargin = -55; // Margen inicial
    // const targetMargin = 8; // Margen final
    const initialMargin = isOpening ? -55 : 8; // Margen inicial
    const targetMargin = isClosing ? -55 : 8; // Margen final
    // const targetMargin = isOpening || isClosing ? 55 : 8;
  
    // Establecemos el margen inicial de inmediato
    notificationRef.current.style.marginBottom = `${initialMargin}px`;
  
    function animateMargin(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
  
      // Calcular el margen actual utilizando una función de interpolación suave
      // const currentMargin = initialMargin + ((targetMargin - initialMargin) * (progress / 0)); // 0ms duración de la animación
      const currentMargin = initialMargin ; // 0ms duración de la animación
      console.log({currentMargin, progress});

      // Aplicar el margen al elemento
      if (notificationRef.current) {
        notificationRef.current.style.marginBottom = `${currentMargin}px`;
      }
  
      // Continuar la animación mientras no hayamos alcanzado el margen objetivo
      if (progress < 0) {
        requestAnimationFrame(animateMargin);
      } else {
        // Asegurarse de que termine exactamente en el margen objetivo
        if (notificationRef.current) {
          notificationRef.current.style.marginBottom = `${targetMargin}px`;
        }
      }
    }
  
    requestAnimationFrame(animateMargin);
  }, [isOpening, isClosing]);
  
  

  return (
    
      isOpen
      ? (
          <div 
            key={ id }
            ref={notificationRef}
            style={{ opacity: isClosing ? 0 : 1 }}
            // style={{ 
            //   opacity: isClosing ? 0 : 1,
            //   marginBottom: isOpening || isClosing ? '-55px' : '',
            // }}
            onMouseEnter={ () => autoClose && pauseTimer() }
            onMouseLeave={ () => autoClose && resumeTimer() }
            className={`Notify group h-[55px] p-2 text-sm shadow-md shadow-black/60 relative w-[240px] flex justify-between items-center gap-x-2 rounded-md pointer-events-auto select-none z-50 duration-300 overflow-hidden ${bg} ${txtColor} ${isClosing ? animation.exit : animation.entrance} `}
          >

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


// import { useRef, useEffect } from "react";

// export default function Notify({ notification }) {
//   const {
//     handleClose,
//     timer,
//     pauseTimer,
//     resumeTimer,
//   } = useNotify(notification);

//   const { id, text, type, icon, iconFirst, autoClose, filled, timeSettings, state, isUpdating, animation } = notification;
//   const { isOpen, isClosing, isOpening } = state;
//   const { bg, txtColor, iconNotify } = notifyMap[type](filled, icon);

//   const notificationRef = useRef(null);

//   // Function to handle smooth margin-bottom transition
//   useEffect(() => {
//     if (!notificationRef.current) return; // Exit if ref is not attached

//     let start;
//     const targetMargin = isOpening || isClosing ? '-55px' : '8px';

//     function animateMargin(timestamp) {
//       if (!start) start = timestamp;

//       // Ensure notificationRef.current still exists
//       if (notificationRef.current) {
//         const currentMargin = parseFloat(window.getComputedStyle(notificationRef.current).marginBottom);
//         const targetValue = parseFloat(targetMargin);
//         const newMargin = currentMargin + (targetValue - currentMargin) * .9;

//         notificationRef.current.style.marginBottom = `${newMargin}px`;

//         if (Math.abs(targetValue - newMargin) > 1) {
//           requestAnimationFrame(animateMargin);
//         } else {
//           notificationRef.current.style.marginBottom = targetMargin;
//         }
//       }
//     }

//     requestAnimationFrame(animateMargin);
//   }, [isOpening, isClosing]);

//   return (
//     isOpen ? (
//       <div
//         key={id}
//         ref={notificationRef}
//         style={{ opacity: isClosing ? 0 : 1 }}
//         onMouseEnter={() => autoClose && pauseTimer()}
//         onMouseLeave={() => autoClose && resumeTimer()}
//         className={`Notify group h-[55px] p-2 text-sm shadow-md shadow-black/60 relative w-[240px] flex justify-between items-center gap-x-2 rounded-md pointer-events-auto select-none z-50 duration-300 overflow-hidden ${bg} ${txtColor} ${isClosing ? animation.exit : animation.entrance}`}
//       >
//         <div className={`w-full flex items-center ${iconFirst ? 'flex-row-reverse justify-end' : 'justify-between'} gap-x-2`}>
//           <h1 className={`h-auto overflow-hidden ${isUpdating ? 'animate-fade-in' : ''} truncate duration-75`}>
//             {text}
//           </h1>
//           {iconNotify}
//         </div>

//         <button
//           onClick={() => handleClose(id)}
//           className={`absolute top-1 right-1 p-0.5 ${filled ? 'bg-gray-50/20 hover:bg-gray-50/40' : 'bg-black/40 hover:bg-black/60'} opacity-0 group-hover:opacity-100 shadow rounded duration-300`}
//         >
//           <CloseIcon className={`w-2 h-2 ${filled ? 'text-black/50' : 'text-white'}`} />
//         </button>
//       </div>
//     ) : null
//   );
// }


