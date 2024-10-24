
// import Notify from "./Notify";
// import useNotify from "./useNotify";
// import './styles.css' 
// import { useEffect, useRef } from "react";
// import { CSSTransition, TransitionGroup } from "react-transition-group";

// export default function NotifyList() {


//   const { notifications, notify } = useNotify()
//   const [nodeRefs, setNodeRefs] = useState({});

//   const handleAddNotify = () => {
//     notify.info('Error adding task')
//     notify.success('Take care about you!', 
//       { 
//         timeSettings: { time: 100000, showTimer: true, timerPosition: 'bottom-left'  } 
//       })
//     notify.warning('Error adding task', 
//       { 
//         timeSettings: { time: 100000, showTimer: true  } 
//       })
//     notify.error('Error adding task')
//     // notify.custom('Task added successfully')
//   }


//   useEffect(() => {
//     // Crear un ref para cada notificación en caso de que no exista
//     const refs = notifications.reduce((acc, notify) => {
//       if (!acc[notify.id]) {
//         acc[notify.id] = useRef(null);
//       }
//       return acc;
//     }, {});

//     setNodeRefs(refs);
//   }, [notifications]);


//   return (
//     <div className='flex flex-col items-center justify-center duration-300'>

//         <button 
//           onClick={ handleAddNotify } 
//           className="p-3 bg-violet-700"
//         > 
//           AddToast
//         </button>

//         {/* <div 
//           ref={toastContainerRef}
//           style={{ transition: 'all 0.3s ease-in-out' }}
//           className='TOAST-CONTAINER transition-all ease-in-out transform flex flex-col gap-y-2 m-3 p-2  duration-300'>
//           {
//             notifications.map((notify) => { 
//               return (
//                 <Notify 
//                   key={notify.id} 
//                   {...notify}
//                 />
//               )
//             })
//           }
//         </div> */}


//         <TransitionGroup
//           className="TOAST-CONTAINER transition-all ease-in-out transform flex flex-col gap-y-2 m-3 p-2 duration-300"
//         >
//           {notifications.map((notify) => {
//             const nodeRef = useRef(null) // Crear el ref para cada notificación
            
//             return (
//               <CSSTransition
//                 key={notify.id}
//                 timeout={300}
//                 classNames={{
//                   enter: 'toast-enter',
//                   enterActive: 'toast-enter-active',
//                   exit: 'toast-exit',
//                   exitActive: 'toast-exit-active',
//                 }}
//                 nodeRef={nodeRef}
//               >
//                 <div ref={nodeRef}>
//                   <Notify {...notify} />
//                 </div>
//               </CSSTransition>
//             )
// })}
//         </TransitionGroup>
//       </div>
//   )
// }

// import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import Notify from "./Notify";
// import useNotify from "./useNotify";
// import './styles.css';
// import React, { useRef } from "react";

// export default function NotifyList() {
//   const { notifications, notify } = useNotify();

//   // Usamos un ref para cada notificación sin depender de useEffect.
//   const nodeRefs = useRef({});

//   const handleAddNotify = () => {
//     notify.info('Info message');
//     notify.success('Success message', { timeSettings: { time: 50000, showTimer: true } });
//     notify.warning('Warning message', { timeSettings: { time: 50000, showTimer: true } });
//     notify.error('Error message');
//   };


//   return (
//     <div className="flex flex-col items-center justify-center duration-300">
//       <button onClick={handleAddNotify} className="p-3 bg-violet-700">
//         Add Toast
//       </button>

//       <TransitionGroup
//         className="TOAST-CONTAINER transition-all ease-in-out transform flex flex-col gap-y-2 p-2 duration-300"
//       >
//         {notifications.map((notify) => {
//           // Asegúrate de que haya un ref único para cada notificación.
//           if (!nodeRefs.current[notify.id]) {
//             nodeRefs.current[notify.id] = React.createRef();
//           }

//           return (
//             <CSSTransition
//               key={notify.id}
//               timeout={300}
//               classNames="list"
//               nodeRef={nodeRefs.current[notify.id]}
//             >
//               <div ref={nodeRefs.current[notify.id]} >
//                 <Notify {...notify} />
//               </div>
//             </CSSTransition>
//           );
//         })}
//       </TransitionGroup>
//     </div>
//   );
// }



import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './styles.css'; // Aquí puedes colocar las animaciones CSS
import Notify from './Notify';
import useNotify from './useNotify';

export default function NotifyList() {

  const { notifications, notify } = useNotify();
  

    const handleAddNotify = () => {
    notify.info('Info message');
    notify.success('Success message', { timeSettings: { time: 50000, showTimer: true } });
    notify.warning('Warning message', { timeSettings: { time: 50000, showTimer: true } });
    notify.error('Error message');
  };

  return (
    <div className="flex flex-col items-center justify-center ">

      <button onClick={handleAddNotify} className="p-3 mb-3 bg-violet-700">
        Add Toast
      </button>

      <TransitionGroup className="toast-container gap-y-2 transition-all ease-in-out transform flex flex-col justify-center items-center  duration-300">
        {notifications.map((notify) => (
          <CSSTransition
            key={notify.id}
            timeout={20000}
            classNames="list"
            nodeRef={notify.nodeRef}
            // onExited={() => removeNotify(notify.id)}
          >
            <div className='' ref={notify.nodeRef.current}>
              <Notify {...notify}  />
            </div>

          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}

