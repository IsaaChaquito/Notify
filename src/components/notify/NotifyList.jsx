
import './styles.css'; // Aquí puedes colocar las animaciones CSS
import Notify from './Notify';
import useNotify from './useNotify';


export default function NotifyList() {

  const { notifyState } = useNotify()

  return (

      <div className={`TOAST-CONTAINER absolute top-2 right-2 bottom-2 left-2  pointer-events-none flex ${notifyState?.screenPositionStyle} transition-all [transform:flex_.3s]  duration-300 overflow-hidden`}>

        {notifyState?.notifies.map((notify) => (
          
          <Notify 
            key = { notify.id } 
            notification = { notify }  
          />
        
        ))}

      </div>
  );
}

