
import { useEffect, useState } from 'react'
import useNotify from '../notify/useNotify'
import { useProvider } from '../../context/useProvider'
import NotifyInteractiveConfig from './NotifyInteractiveConfig'
import { DicesIcon } from '../../assets/icons/dices'
import { Flipped, Flipper } from 'react-flip-toolkit'

import CustomSelect2 from '../custom-select-2/CustomSelect2'

export const positions = {
  'top-right': 'top-right',
  'bottom-right': 'bottom-right',
  'bottom-center': 'bottom-center',
  'bottom-left': 'bottom-left',
  'top-left': 'top-left',
  'top-center': 'top-center',
}

const notyTypes = ['info', 'success', 'warning', 'error', 'neutral', 'promise']


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
            text: 'Promise resolved successfully', 
            icon: 'success',
            autoClose: true,
          }
        )

      } , Math.floor((Math.random() * 2) + 3) * 1000 )
    }

  }

  const [basicNotify, setBasicNotify] = useState('info')
  const handleSetBasicNotify = ( newVal ) => setBasicNotify( newVal )  
  const handleBasicNotify = () => notify[basicNotify](`I'm a ${basicNotify} Notify`)


  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 640); // Tailwind 'sm' breakpoint is 640px

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 640);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const flipKey = isMobileView ? 'mobile-view' : 'desktop-view';


  return (
    <div className='flex flex-col gap-y-16 items-center w-full sm:w-max-w-[320px] sm:max-w-xl -mt-20 sm:-mt-4 h-full p-2 rounded overflow-hidden z-10 duration-300 mb-16'>

      <div className='bg-black gap-y-4 w-full rounded flex flex-col justify-center items-cente border border-[#ffffff30] shadow-md'>
        <h2 className='text-xl sm:text-2xl w-full p-3 text-start text-white border-b border-[#ffffff30]'>
          Basic use of <code className='notify-badge text-base rounded-md py-1 px-2 sm:ml-1'>Notify</code>
        </h2>

        <div className="w-full flex items-center justify-center rounded gap-x-2 p-2  bg-black text-white duration-150 cursor-pointer shadow-md z-20 select-none "
        >
          <button onClick={ (e) => e.target === e.currentTarget && handleBasicNotify() }  className='w-1/3 active:scale-90 px-2 py-2 text-sm rounded text-nowrap  duration-75 bg-gradient-to-tr from-indigo-900 bg-indigo-900 hover:bg-indigo-700 '>
            Click me!
          </button>

          <CustomSelect2 
            width='w-full' 
            options={notyTypes} 
            value={basicNotify}
            setValue={ handleSetBasicNotify }
          />
        </div>

        <code className='bg-black p-6 w-full rounded-b'>
          <div className='flex gap-y-2 text-xs '>
            <span className='flex text-white'> notify.</span>
            <span className='text-yellow-500'>{ basicNotify }</span>
            <span className='text-blue-500'>(</span>
            <span className='text-lime-300 text-nowrap'>{`"I'm a ${ basicNotify } Notify"`}</span>
            <span className='text-blue-500'>)</span>
          </div>
        </code>

        

      </div>

      <div className='bg-black w-full rounded flex flex-col justify-center items-center border border-[#ffffff30] shadow-md'>
        <h2 className='text-xl sm:text-2xl w-full p-3  text-start text-white z-10 border-b border-[#ffffff30]'>
          Random examples of <code className='notify-badge text-base rounded-md py-1 px-2 sm:ml-1'>Notify</code>
        </h2>    


        <Flipper flipKey={flipKey} spring={{ stiffness: 200, damping: 30 }} >
          <section className={`flex gap-3 m-2 ${isMobileView ? 'flex-col justify-center  w-[200px] ' : 'flex-row justify-between w-full'}  items-center  select-none`}>
            
            <Flipped flipId="add-notify">
              <div className='w-full sm:w-auto '>
                <button onClick={handleAddNotify} className="flex items-center justify-center gap-x-2 w-full h-12 px-3 bg-gradient-to-tr from-indigo-900 bg-indigo-900 hover:bg-indigo-700 shadow-md rounded active:scale-95 duration-300">
                  <span>Random Notify</span>
                  <DicesIcon />
                </button>
              </div>
            </Flipped>

            <Flipped flipId="alternate-container">
              <div className='w-full sm:w-auto '>
                <button onClick={handlePositionList} className='w-full sm:w-auto p-2 rounded group bg-black hover:bg-black/80 shadow-md text-sm flex flex-col justify-center items-center gap-1 duration-300'>
                  <span>Alternate position</span>
                  <code className='text-xs p-1 rounded-sm bg-gradient-to-tr from-indigo-900 bg-indigo-900 hover:bg-indigo-700 shadow-sm group-active:scale-75 duration-300'> 
                    {notifyState?.screenPosition}
                  </code>
                </button>
              </div>
            </Flipped>

            <Flipped flipId="max-stack">
              <div className='w-full sm:w-auto'>
                <div className='w-full h-12 px-2 rounded group flex flex-col justify-center items-center bg-gradient-to-tr from-indigo-900 bg-indigo-900 hover:bg-indigo-700 shadow-sm duration-300'>
                  <div className="flex justify-center items-center gap-x-2">
                    <span>Max stack:</span>
                    <span>{notifyState?.maxLength}</span>
                  </div>
                  <input 
                    className="text-xs appearance-none group-hover rounded m-1 w-full" 
                    type="range" 
                    min={1} 
                    max={15} 
                    value={notifyState?.maxLength ?? 7}
                    onChange={(e) => setMaxLength(e.target.value)}
                  />
                </div>
              </div>
            </Flipped>

          </section>
        </Flipper>
      </div>

      

      <div className='bg-black w-full rounded overflow-hidden  flex flex-col justify-center items-center border border-[#ffffff30] shadow-md'>
        <h2 className='text-xl sm:text-2xl w-full p-3 text-start text-white z-10 border-b border-[#ffffff30]'>
          Or try arbitrary <code className='notify-badge text-base rounded-md py-1 px-2 sm:ml-1'>settings</code>
        </h2>

        <NotifyInteractiveConfig />
      </div>

    </div>


  )
}
