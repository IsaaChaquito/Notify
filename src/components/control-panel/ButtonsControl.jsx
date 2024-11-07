
import { useEffect, useState } from 'react'
import useNotify from '../notify/useNotify'
import { useProvider } from '../../context/useProvider'
import NotifyInteractiveConfig from './NotifyInteractiveConfig'

export const positions = {
  'top-right': 'top-right',
  'bottom-right': 'bottom-right',
  'bottom-center': 'bottom-center',
  'bottom-left': 'bottom-left',
  'top-left': 'top-left',
  'top-center': 'top-center',
}

export default function ButtonsControl() {


  const { notify, setNotifiesPosition, setMaxLength } = useNotify()

  const { notifyState } = useProvider()

  const [counter, setCounter] = useState(0)

  const handlePositionList = () => {
    setCounter( counter => (counter + 1 === Object.keys(positions).length) ? 0 : counter + 1 )

    handleAddNotify()
  }



  useEffect(() => {
    const key = Object.keys(positions)[counter]
    setNotifiesPosition( positions[key] )
  }, [counter])


  const notyTypes = ['info', 'success', 'warning', 'error', 'neutral', 'promise']
  const handleAddNotify = () => {

    const rnd = Math.floor(Math.random() * notyTypes.length)
    const isPromise = notyTypes[rnd] === 'promise'

    const randomNotifyCfg = {
      type: notyTypes[rnd],
      text: `I am a ${notyTypes[rnd]} Notify`,
      filled: Math.floor(Math.random() * 10) % 2 === 0,
      icon: isPromise ? notyTypes['promise'] : notyTypes[rnd],
      iconFirst: Math.floor(Math.random() * 10) % 2 === 0,
      autoClose: !isPromise,
      showProgressBar: isPromise ? 'false' : Math.floor(Math.random() * 10) % 2 === 0,
      timeSettings: {
        duration: Math.floor(Math.random() * 3) * 1000 + 3000,
        showTimer: isPromise ? 'false' : Math.floor(Math.random() * 10) % 2 === 0,
        timeFormat: Math.floor(Math.random() * 10) % 2 === 0? 's' : 'ms',
        timerPosition: Math.floor(Math.random() * 10) % 2 === 0  ? 'bottom-left' : 'bottom-right',
      }
    }

    const notifyObj = notify[randomNotifyCfg.type](randomNotifyCfg.text, randomNotifyCfg)

    if( isPromise ){
      
      setTimeout(() => {
        notify.update(
          {
            ...notifyObj, 
            text: 'Promise resolve successfully', 
            icon: 'success',
            autoClose: true,
          }
        )

      } , Math.floor((Math.random() * 2) + 3) * 1000 )
    }

  }


  return (
    <div className='flex flex-col items-center w-full h-full'>
      
      <section className='flex justify-center items-center m-10 gap-3 *:duration-300  select-none'>
        <button onClick={ handleAddNotify } className="p-2 bg-gradient-to-tr from-blue-900 from-10% shadow-sm group-hover:shadow-blue-900 rounded-xl hover:bg-violet-700 active:scale-95">
          Random Notify
        </button>

        <button onClick={ handlePositionList } className='p-2 rounded-xl group bg-black hover:bg-black/80 text-sm flex flex-col justify-center items-center '>
          <span>Alternate position</span>
          <code className='text-xs p-1 rounded bg-gradient-to-tr from-blue-900 from-10% hover:bg-violet-700 shadow-sm group-hover:shadow-blue-900 group-active:scale-75 duration-300' > 
            { notifyState?.screenPosition } 
          </code>
        </button>


        <div className='p-2 rounded-xl group bg-black hover:bg-black/80 text-sm flex flex-col justify-center items-center '>
          <span>Max stack</span>
          
          <input 
            className="w- py-1  text-xs appearance-none bg-gradient-to-tr from-blue-900 from-10% shadow-sm group-hover:shadow-blue-900 rounded hover:bg-violet-700" 
            type="range" 
            min={1} 
            max={15} 
            value={ notifyState?.maxLength ?? 7 }
            onChange={(e) => setMaxLength(e.target.value)}
          />
        </div>

      </section>

      <NotifyInteractiveConfig />

    </div>


  )
}
