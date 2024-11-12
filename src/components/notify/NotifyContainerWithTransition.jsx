
import Notify from './Notify';
import useNotify from './useNotify';
import { Flipped, Flipper, spring } from 'react-flip-toolkit';

export default function NotifyContainer() {
  
  const { notifyState } = useNotify();

  const flipKey = `${notifyState?.notifies.map( n => n.id ).join(',')}`


  return (

    <Flipper flipKey={ flipKey } spring="noWobble" >
      <div
        className={`TOAST-CONTAINER fixed z-40 top-2 right-2 bottom-2 left-2 pointer-events-none flex ${notifyState?.screenPositionStyle} overflow-hidden will-change-transform  *:mb-2`}
      >
        {notifyState?.notifies.map((notify) => (
          <Flipped key={notify.id} flipId={notify.id}>
            { ( props ) => (
              <Notify 
                notification={notify} 
                {...props}
              /> 
            )}
          </Flipped>
        ))}
      </div>
    </Flipper>
    );
}
