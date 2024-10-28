
import './styles.css'; // Aquí puedes colocar las animaciones CSS
import Notify from './Notify';
import useNotify from './useNotify';


export default function NotifyList() {

  const { notifyState } = useNotify()

  return (
    <div className="flex flex-col items-center justify-center ">

      <div className={`toast-container absolute ${notifyState?.screenPositionStyle} pointer-events-none flex flex-col  duration-300 overflow-hidden`}>

        {notifyState?.notifies.map((notify) => (
          
          <Notify 
            key = { notify.id } 
            notification = { notify }  
          />
        
        ))}

      </div>
    </div>
  );
}

