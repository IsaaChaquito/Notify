
import { useMemo } from 'react';
import Notify from './Notify';
import useNotify from './useNotify';
import { Flipped, Flipper } from 'react-flip-toolkit';

export default function NotifyContainer() {
  
  const { notifyState } = useNotify();

  // const flipKey = `${notifyState?.notifies.map( n => n.id ).join(',')}`

  const flipKey = useMemo(() => `${notifyState?.notifies.map( n => n.id ).join(',')}`, [notifyState?.notifies])


  return (

    <Flipper flipKey={ flipKey } spring={{ stiffness: 600, damping: 60 }} className='duration-75' >
      <div
        className={`TOAST-CONTAINER fixed z-40 top-2 right-2 bottom-2 left-2 pointer-events-none flex ${notifyState?.screenPositionStyle} overflow-hidden will-change-transform *:mb-2`}
      >
        {notifyState?.notifies.map((notify) => (
          <Flipped  key={notify.id} flipId={notify.id}  >
              <div> {/* De FLIP technique applied to this div, so we can have another animation in the Notify component */}
                <Notify notification={notify} /> 
              </div>
          </Flipped>
        ))}
      </div>
    </Flipper>
    );
}
