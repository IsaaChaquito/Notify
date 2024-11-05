

import Notify from './Notify';
import useNotify from './useNotify';


/**
 * NotifyContainer is a component responsible for rendering a container
 * that holds multiple notification components. It fetches the current
 * notification state using the useNotify hook, displaying each active 
 * notification within a flex container styled according to the 
 * screenPositionStyle. The container is positioned fixed, ensuring 
 * notifications are visible across different screen sections.
 */
export default function NotifyContainer() {

  const { notifyState } = useNotify()

  return (

      <div className={`TOAST-CONTAINER fixed z-40 top-2 right-2 bottom-2 left-2  pointer-events-none flex ${notifyState?.screenPositionStyle} overflow-hidden duration-300`}>

        {notifyState?.notifies.map((notify) => (
          
          <Notify 
            key = { notify.id } 
            notification = { notify }  
          />
        
        ))}

      </div>
  );
}

