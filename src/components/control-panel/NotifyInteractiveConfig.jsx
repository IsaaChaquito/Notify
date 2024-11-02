import React, { useEffect, useState } from 'react'
import { generateId } from '../../utils/utilities'
import useNotify from '../notify/useNotify'
import '../notify/styles.css' 
import CustomSelect from './CustomSelect'

const notyTypesOpitons = ['info', 'success', 'warning', 'error', 'neutral', 'promise']
const booleanOptions = ['true', 'false']
const timerPositionOptions = ['bottom-right', 'bottom-left', 'top-left']
const durationOptions = ['2000', '3000', '4000', '5000', '10000']
const timeFormatOptions = ['s', 'ms']

const NotifyInteractiveConfig = () => {

  const { notify } = useNotify()

  const [state, setState] = useState({
    id: generateId(),
    type: 'info',
    text: 'I am a info Notify',
    filled: true,
    icon: 'info',
    autoClose: true,
    showProgressBar: true,
    timeSettings: {
      duration: 3000,
      showTimer: true,
      timeFormat: 's',
      timerPosition: 'bottom-right',
    }
  })

  const updateState = ( newState ) => setState( {...newState, id: generateId()} )

  useEffect(() => {
    const newNoti = { ...state }
    delete newNoti.id
    notify[newNoti.type]?.(newNoti.text, newNoti) || alert('El tipo de notificacion no existe')
  }, [state])

  return (
    <div className='flex flex-col gap-2 '>
      <code className='flex flex-col items-center gap-x-2  min-w-fit min-h-fit p-3 bg-black shadow-md rounded-xl overflow-x-auto *:text-xs *:text-sky-400'>
        
        <div className='flex items-center gap-x-2 '>
          <span className="self-start !text-sky-300 after:content-['='] after:text-sky-500">options </span>

        <span className='self-start !text-pink-400'><pre>{"{"}</pre></span>
        <span className='self-end !text-pink-400 -ml-3.5'><pre>{"}"}</pre></span>

        <div className='flex flex-col my-4 gap-1'>

          <span className='flex items-center gap-x-2 '>id: auto-generated,</span>

          <CustomSelect 
            attribute={'type'}
            options={notyTypesOpitons} 
            type='string'
            state={state} 
            updateState={ updateState } 
          /> 

          <CustomSelect 
            attribute={'showProgressBar'}
            options={booleanOptions} 
            type='boolean'
            state={state} 
            updateState={ updateState } 
          />

          <CustomSelect 
            attribute={'autoClose'}
            options={booleanOptions} 
            type='boolean'
            state={state} 
            updateState={ updateState } 
          />

          <CustomSelect 
            attribute={'icon'}
            options={notyTypesOpitons} 
            type='string'
            state={state} 
            updateState={ updateState } 
          />

          <CustomSelect 
            attribute={'filled'}
            options={booleanOptions} 
            type='boolean'
            state={state} 
            updateState={ updateState } 
          />

          <span>{`timeSettings: {`}</span>
            <div className='flex flex-col gap-1 ml-3'>
              
              <CustomSelect 
                attribute={'duration'}
                options={durationOptions} 
                type='number'
                state={state} 
                updateState={ updateState } 
              />

              <CustomSelect 
                attribute={'timeFormat'}
                options={timeFormatOptions} 
                type='string'
                state={state} 
                updateState={ updateState } 
              />

              <CustomSelect 
                attribute={'showTimer'}
                options={booleanOptions} 
                type='boolean'
                state={state} 
                updateState={ updateState } 
              />

              <CustomSelect 
                attribute={'timerPosition'}
                options={timerPositionOptions} 
                type='string'
                state={state} 
                updateState={ updateState } 
              />

            </div>

          <span className="">{`}`}</span>

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
          <span className='text-sky-300'><pre> options</pre></span>
          <span className='text-blue-500'>)</span>
        </div>

      </code>

      

    </div>
  )
}

export default NotifyInteractiveConfig
