
import './styles.css'; // Aquí puedes colocar las animaciones CSS
import Notify from './Notify';
import useNotify from './useNotify';
import { useEffect, useState } from 'react';

export const positions = {
  'top-right': 'top-20 right-4',
  'bottom-right': 'bottom-1 right-1 flex-col-reverse',
  'bottom-center': 'bottom-1 left-1/2 -translate-x-1/2 flex-col-reverse',
  'bottom-left': 'bottom-1 left-1 flex-col-reverse',
  'top-left': 'top-20 left-1',
  'top-center': 'top-20 left-1/2 -translate-x-1/2',
}

export default function NotifyList() {

  const { notifications, notify } = useNotify()
  const [position, setPosition] = useState( positions['top-right'] )
  const [counter, setCounter] = useState(0)

  const handleAddNotify = () => {
    // notify.info('Info message', {timeSettings:{time:6000}})
    // notify.error('Error message');
    // notify.success('Success message', { timeSettings: { time: 4000, showTimer: true } });
    notify.warning('Warning message', { timeSettings: { time: 50000, showTimer: true, timeFormat: 's' } });
  }

  const handlePositionList = () => {
    setCounter( counter => (counter + 1 === Object.keys(positions).length) ? 0 : counter + 1 )
  }

  useEffect(() => {
    const key = Object.keys(positions)[counter]
    setPosition( positions[key] )
  }, [counter])


  return (
    <div className="flex flex-col items-center justify-center ">

      <section className='flex justify-center items-center mb-3 gap-3 *:duration-300  '>
        <button onClick={handleAddNotify} className="p-2 bg-violet-800 rounded-xl hover:bg-violet-500 active:scale-95">
          Add Toast
        </button>

        <button onClick={ handlePositionList } className='p-2 rounded-xl group bg-black hover:bg-black/80 text-sm flex flex-col justify-center items-center '>
          <span>Alternate position</span>
          <code className='text-xs  p-1 rounded-full bg-gradient-to-tr from-blue-900 from-10% shadow-sm group-hover:shadow-blue-900 group-active:scale-75 duration-300' > 
            { Object.keys(positions)[counter] } 
          </code>
        </button>

      </section>

      <div className={`toast-container absolute ${position} pointer-events-none flex flex-col  duration-300 overflow-hidden`}>

        {notifications.map((notify) => (
          
          <Notify key={notify.id} {...notify}  />
        
        ))}

      </div>
    </div>
  );
}

