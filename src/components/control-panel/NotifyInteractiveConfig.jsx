import { useEffect, useState } from 'react'
import useNotify from '../notify/useNotify'
import CustomSelect from './CustomSelect'

const notyTypesOpitons = ['info', 'success', 'warning', 'error', 'neutral', 'promise']
const booleanOptions = ['true', 'false']
const timerPositionOptions = ['bottom-right', 'bottom-left', 'top-left']
const durationOptions = ['2000', '3000', '4000', '5000', '10000']
const timeFormatOptions = ['s', 'ms']
const animationOptions = {
  entrance: ['animate-[zoomIn_.4s_ease]', 'animate-[fade-in_.4s_ease]',  'animate-[jump_.4s_ease]', 'animate-[slide-in-bottom_.4s_ease]', 'animate-[slide-in-top_.4s_ease]'],
  exit: [ 'animate-[zoomOut_.4s_ease]', 'animate-[fade-out_.4s_ease]', 'animate-[jump_.4s_ease]', 'animate-[slide-out-top_.4s_ease]', 'animate-[slide-out-bottom_.4s_ease]']
}

const optionsReducer = {
  'type': notyTypesOpitons,
  'icon': notyTypesOpitons,
  'iconFirst': booleanOptions,
  'filled': booleanOptions,
  'autoClose': booleanOptions,
  'showProgressBar': booleanOptions,
  'timerPosition': timerPositionOptions,
  'duration': durationOptions,
  'timeFormat': timeFormatOptions,
  'showTimer': booleanOptions,
  'entrance': animationOptions.entrance,
  'exit': animationOptions.exit
}

const NotifyInteractiveConfig = () => {

  const { notify } = useNotify()

  const [state, setState] = useState({
    type: 'info',
    filled: true,
    icon: 'info',
    iconFirst: true,
    autoClose: true,
    showProgressBar: true,

    timeSettings: {
      duration: 2000,
      showTimer: true,
      timeFormat: 's',
      timerPosition: 'bottom-right',
    },

    animation: { 
      entrance: animationOptions.entrance[0],
      exit: animationOptions.exit[0] 
    },
  })

  

  function objectMapper(obj, tabCounter = 0, keyObj = '', endKey = '') {
    const elements = [];
  
    const renderElement = (key, content, marginLeft) => (
      <span key={key} style={{ marginLeft: `${marginLeft}px` }}>
        {content}
      </span>
    );
  
    const renderEndKey = (key, marginLeft) => (
      <span key={key} style={{ marginLeft: `${marginLeft}px` }}>
        {'}'}
        <span className="text-white">,</span>
      </span>
    );
  
    Object.entries(obj).forEach(([key, value]) => {
      const marginLeft = tabCounter * 12;
  
      if (keyObj) {
        elements.push(renderElement(key + 1, `${keyObj}: {`, marginLeft - 12));
        keyObj = '';
      }
  
      if (value instanceof Object) {
        const objKeys = Object.keys(value);
        elements.push(objectMapper(value, tabCounter + 1, key, objKeys[objKeys.length - 1]));
  
        if (endKey === key) {
          elements.push(renderEndKey(key + 5, marginLeft - 12));
          endKey = '';
        }
      } else {
        elements.push(
          <span key={key + 3} style={{ marginLeft: `${marginLeft}px` }}>
            <CustomSelect
              attribute={key}
              options={optionsReducer[key] ?? optionsReducer['type']}
              type={typeof obj[key]}
              state={state}
              updateState={updateState}
            />
          </span>
        );
  
        if (endKey === key) {
          elements.push(renderEndKey(key + 5, marginLeft - 12));
          endKey = '';
        }
      }
    });
  
    return elements;
  }
  

  const updateState = ( newState ) => setState( { ...newState } )

  useEffect(() => {

    const newNoti = { ...state }

    notify[newNoti.type]?.(`I'm a ${newNoti.type} Notify`, newNoti) || alert('El tipo de notificacion no existe')
  }, [state])

  return (
    <div className='flex flex-col gap-2 '>
          
      <code className='flex flex-col items-center gap-x-2  min-w-fit min-h-fit p-3 bg-black shadow-md rounded-xl overflow-x-auto *:text-xs *:text-sky-400'>

        <div className='flex items-center self-start gap-x-2 mb-2'>
          <span className='text-red-500'>const</span>
          <span className='self-start !text-pink-400'><pre>{"{"}</pre></span>
          <span className="">{ ` notify `}</span>
          <span className=' !text-pink-400'><pre>{"}"}</pre></span>
          <span className="text-yellow-500">{ `useNotify`}</span>
          <span className="!text-pink-400 -ml-2">{ `()`}</span>
        </div>
        
        <div className='flex items-center gap-x-2 '>
          
          <span className='self-start text-red-500'>const</span>
          <span className="self-start !text-sky-300 after:content-['='] after:text-sky-500">settings </span>

          <span className='self-start !text-pink-400'><pre>{"{"}</pre></span>
          <span className='self-end !text-pink-400 -ml-3.5'><pre>{"}"}</pre></span>

          <div className='flex flex-col my-4 gap-1'>
            { objectMapper(state) }
          </div>
        </div>
        
        <div className='flex self-start gap-y-2 mt-10'>
          <span className='flex text-white'> notify.</span>
          <span className='text-yellow-500'>{state.type}</span>
          <span className='text-blue-500'>(</span>
          <span className='text-lime-300'>"I'm a </span>
          <span className='text-pink-400'><pre> $</pre></span>
          <span className='text-orange-300'>{`{`}</span>
          <span className='text-white'>{`options.`}</span>
          <span className='text-sky-400'>{`type`}</span>
          <span className='text-orange-300'>{`}`}</span>
          <span className='text-lime-300'><pre> Notify"</pre></span>
          <span className='text-white'>,</span>
          <span className='text-sky-300'><pre> settings</pre></span>
          <span className='text-blue-500'>)</span>
        </div>

      </code>

    </div>
  )
}

export default NotifyInteractiveConfig
