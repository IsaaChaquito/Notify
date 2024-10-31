import React, { useEffect, useState } from 'react'
import { generateId } from '../../utils/utilities'
import useNotify from '../notify/useNotify'
import '../notify/styles.css' 
import CustomSelect from './CustomSelect'
import { WarningCircleIcon } from '../notify/icons'

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

  const updateState = ( newState ) => {
    console.log('newState', newState)
    setState( {...newState, id: generateId()} )}

  useEffect(() => {
    const newNoti = { ...state }
    delete newNoti.id
    notify[newNoti.type]?.(newNoti.text, newNoti) || alert('El tipo de notificacion no existe')
  }, [state])

  return (
    <div>
      <code className='flex items-center gap-x-2  min-w-fit min-h-fit p-3 bg-black rounded-3xl overflow-x-auto *:text-xs *:text-yellow-500'>
        <span className="">notify =</span>

        <span className='self-start'><pre>{"{"}</pre></span>
        <span className='self-end -ml-3.5'><pre>{"}"}</pre></span>

          <div className='flex flex-col my-4 gap-1'>

              <span className='flex items-center gap-x-2'>id: { state.id } </span>

              <CustomSelect 
                attribute={'type'}
                options={notyTypesOpitons} 
                type='string'
                state={state} 
                updateState={ updateState } 
              />

              <span>{`string: "I am a ${state.type} Notify"`}</span>

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

                <span>{`}`}</span>

              {/* <div>
              <span>{`timeSettings: {`}</span>
              <span className='self-end'><pre>{"}"}</pre></span>
              </div> */}




          </div>
        {/* <span className='self-end'><pre>{"}"}</pre></span> */}

      </code>

    </div>
  )
}

export default NotifyInteractiveConfig
