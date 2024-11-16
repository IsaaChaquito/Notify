
import React, { useMemo } from 'react';
import Notify from './Notify';
import useNotify from './useNotify';
import { Flipped, Flipper } from 'react-flip-toolkit';

/**
 * NotifyContainer is a component responsible for rendering a container
 * that holds multiple notification components. It fetches the current
 * notification state using the useNotify hook, displaying each active 
 * notification within a flex container styled according to the 
 * screenPositionStyle. The container is positioned fixed, ensuring 
 * notifications are visible across different screen sections.
 * 
 * This component also utilizes the FLIP technique to add an extra animation
 * between the Notify components, which are already animated. This is done
 * by wrapping each Notify component in a Flipped component and using a
 * flipKey to determine when the animation should be triggered.
 */
const NotifyContainer = React.memo(() => {
  const { notifyState } = useNotify();

  const flipKey = useMemo(
    () => `${notifyState?.notifies.map((n) => n.id).join(',')}`,
    [notifyState?.notifies]
  );

  return (
    <Flipper flipKey={flipKey} spring={{ stiffness: 600, damping: 60 }} >
      <div
        className={`TOAST-CONTAINER fixed z-50 top-2 right-2 bottom-2 left-2 pointer-events-none flex ${notifyState?.screenPositionStyle}  will-change-transform *:mb-2`}
      >
        {notifyState?.notifies.map((notify) => (
          <Flipped key={notify.id} flipId={notify.id}>
            <div> {/* De FLIP technique applied to this div, so we can have another animation in the Notify component */}
              <Notify notification={notify} />
            </div>
          </Flipped>
        ))}
      </div>
    </Flipper>
  );
});

export default NotifyContainer;

