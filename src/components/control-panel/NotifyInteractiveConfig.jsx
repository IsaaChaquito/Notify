import { useState } from 'react'
import useNotify from '../notify/useNotify'
import CustomSelect from './CustomSelect'

const notyTypesOpitons = ['info', 'success', 'warning', 'error', 'neutral', 'promise']
const booleanOptions = ['true', 'false']
const timerPositionOptions = ['bottom-right', 'bottom-left', 'top-left']
const durationOptions = ['2000', '3000', '4000', '5000', '10000']
const timeFormatOptions = ['s', 'ms']
const animationOptions = {
  entrance: ['animate-[zoomIn_.3s_ease-in-out]', 'animate-[fade-in_.3s_ease]',  'animate-[jump_.3s_ease]', 'animate-[slide-in-bottom_.3s_ease]', 'animate-[slide-in-top_.3s_ease]'],
  exit: [ 'animate-[zoomOut_.3s_ease-in-out]', 'animate-[fade-out_.3s_ease]', 'animate-[jump_.3s_ease]', 'animate-[slide-out-top_.3s_ease]', 'animate-[slide-out-bottom_.3s_ease]']
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

function NotifyInteractiveConfig () {

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


  function renderObjectStructure(obj, tabCounter = 0, keyObj = '', endKey = '') {
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
        elements.push(renderObjectStructure(value, tabCounter + 1, key, objKeys[objKeys.length - 1]));
  
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
  

  const updateState = ( newState ) => {
    setState( { ...newState } )
    notify[newState.type]?.(`I'm a ${newState.type} Notify`, newState) || alert('El tipo de notificacion no existe')
  }


  return (
    <div className='flex flex-col gap-2 m-5'>
          
      <code className='flex flex-col items-center gap-x-2 w-auto sm:min-w-fit sm:min-h-fit p-5 bg-black shadow-md rounded overflow-x-auto *:text-xs *:text-sky-400'>

        <div className='flex items-center self-start gap-x-2 mb-2'>
          <span className='text-red-500'>const</span>
          <span className='self-start !text-pink-400'><pre>{"{"}</pre></span>
          <span className="">{ ` notify `}</span>
          <span className=' !text-pink-400'><pre>{"}"}</pre></span>
          <span className="text-yellow-500">{ `useNotify`}</span>
          <span className="!text-pink-400 -ml-2">{ `()`}</span>
        </div>
        
        <div className='flex flex-col items-center self-start gap-x-2 '>
          
          <div className='flex self-start gap-x-2'>
            <span className=' text-red-500'>const</span>
            <span className=" !text-sky-300 after:content-['='] after:text-sky-500">settings </span>
            <span className=' !text-pink-400'><pre>{"{"}</pre></span>
          </div>

          <div className='flex flex-col my-1 gap-1 ml-4'>
            { renderObjectStructure(state) }
          </div>

          <span className='self-start !text-pink-400'><pre>{"}"}</pre></span>

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
