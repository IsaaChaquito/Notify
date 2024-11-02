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
}

const IntExml = () => {

  const { notify } = useNotify()

  const [state, setState] = useState({
    type: 'info',
    filled: true,
    icon: 'info',
    iconFirst: false,
    autoClose: true,
    showProgressBar: true,
    timeSettings: {
      duration: 3000,
      showTimer: true,
      timeFormat: 's',
      timerPosition: 'bottom-right',
    }
  })

  const complexObject = {
    id: "abc123",
    name: "Sample Object",
    isActive: true,
    metadata: {
      createdBy: "adminUser",
      settings: {
        theme: {
          color: "blue",
          darkMode: true
        },
        notifications: {
          email: true,
          sms: false,
          push: true
        }
      }
    },
    details: {
      description: "A complex object for testing purposes",
      properties: {
        size: "large",
        color: "red",
        visible: false,
        owner: {
          firstName: "John",
          lastName: "Doe",
          contact: {
            email: "johndoe@example.com",
            address: {
              city: "New York",
              country: "USA",
              postalCode: "10001"
            }
          }
        }
      }
    },
    permissions: {
      read: true,
      write: false,
      share: {
        public: true,
        team: {
          name: "Development Team",
          accessLevel: "read-only",
          members: {
            user1: {
              name: "Alice",
              role: "developer",
              isActive: true
            },
            user2: {
              name: "Bob",
              role: "tester",
              isActive: false
            }
          }
        }
      }
    }
  };


function objectMapper(obj, tabCounter = 0, keyObj = '', endKey = '') {
  const elements = [];
  Object.entries(obj).forEach(([key, value]) => {

    if (value instanceof Object) {
      const objToArray = Object.keys(value);
      elements.push(
        objectMapper(value, tabCounter + 1, key, objToArray[objToArray.length - 1] )
      )
    } else {

      if( keyObj != '' ) {
        elements.push( 
          <span key={key+1} style={{ marginLeft: `${(tabCounter > 0 ? tabCounter-1: tabCounter) * 12}px` }} >
            {keyObj}:{' {'}
          </span> 
        )
          keyObj = ''
      }

      elements.push(
        <span key={key+3} style={{ marginLeft: `${tabCounter * 12}px` }} >
          <CustomSelect
            attribute={key}
            options={optionsReducer[key] ?? optionsReducer['type']}
            type={typeof obj[key]}
            state={obj}
            updateState={updateState}
          />
        </span>
      )

      if( endKey === key ) {
        elements.push( 
          <span key={key+5} style={{ marginLeft: `${(tabCounter > 0 ? tabCounter-1: tabCounter) * 12}px` }} >
            {'}'}
            <span className='text-white'>,</span>
          </span> 
        )
        endKey = ''
      }
    }

}); 
  return elements;
}

// function objectMapper(obj, tabCounter = 0, keyObj = '', endKey = '') {
//   const elements = [];
  
//   for (const key in obj) {
    
//     if (obj[key] instanceof Object) {
//       const objToArray = Object.keys(obj[key]);
//       console.log('key', key);
//       console.log('obj[key]', obj[key]);
//       // console.log('childrens', objToArray);
//       elements.push(
//         objectMapper(obj[key], tabCounter + 1, key, objToArray[objToArray.length - 1] )
//       )

//     } else {
//       console.log('keyObj', keyObj);
//       if( keyObj != '' ) {
//         elements.push( 
//           <span key={keyObj+key+1} style={{ marginLeft: `${(tabCounter > 0 ? tabCounter-1: tabCounter) * 12}px` }} >
//             {keyObj}:{' {'}
//           </span> 
//         )
//           keyObj = ''
//       }
      
//       elements.push(
//         <span key={keyObj+key+2} id={keyObj+key} style={{ marginLeft: `${tabCounter * 12}px` }} >
//           <CustomSelect
//             attribute={key}
//             options={optionsReducer[key] ?? optionsReducer['type']}
//             type={typeof obj[key]}
//             state={obj}
//             updateState={updateState}
//           />
//         </span>
//       )

//       if( endKey === key ) {
//         elements.push( 
//           <span key={keyObj+key+3} style={{ marginLeft: `${(tabCounter > 0 ? tabCounter-1: tabCounter) * 12}px` }} >
//             {'}'}
//             <span className='text-white'>,</span>
//           </span> 
//         )
//         endKey = ''
//       }
//     }

//   }
//   return elements;
// }

  const updateState = ( newState ) => setState( {...newState, id: generateId()} )

  useEffect(() => {

    console.log( objectMapper(complexObject) );

    const newNoti = { ...state }
    delete newNoti.id
    // notify[newNoti.type]?.(`${newNoti.type}`, newNoti) || alert('El tipo de notificacion no existe')
  }, [state])

  return (
    <div className='flex flex-col gap-2 '>
      <code className='flex flex-col items-center gap-x-2  min-w-fit min-h-fit p-3 bg-black shadow-md rounded-xl overflow-x-auto *:text-xs *:text-sky-400'>
        
        <div className='flex items-center gap-x-2 '>
          <span className="self-start !text-sky-300 after:content-['='] after:text-sky-500">options </span>

        <span className='self-start !text-pink-400'><pre>{"{"}</pre></span>
        <span className='self-end !text-pink-400 -ml-3.5'><pre>{"}"}</pre></span>

        <div className='flex flex-col my-4 gap-1'>
          {objectMapper(complexObject) }
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

export default IntExml
