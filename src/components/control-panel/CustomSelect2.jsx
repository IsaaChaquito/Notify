import React, { useRef, useState } from 'react'
import { ChevronRightIcon } from '../../assets/icons/chevron-right'

const CustomSelect2 = ( { options, showIndex, width } ) => {

  const [localState, setLocalState] = useState({
    indexSelected: 0,
    isShowingOptions: false,
    showIndex: showIndex ?? false,

    
    hideOptions: () => setLocalState({ ...localState, isShowingOptions: false }),
    showOptions: () => setLocalState({ ...localState, isShowingOptions: true }),
    alternateShowOptions: () => setLocalState(state => ({ ...state, isShowingOptions: !state.isShowingOptions })),
  })

  const optionsRef = useRef(null);
  const selectedRef = useRef(null);


  const handleOnClick = ( index ) =>{
    setLocalState({
      ...localState, 
      selected: index, 
      isShowingOptions: false
    })


  }

  const handleButtonSelected = () =>{

    if( optionsRef?.current === document.activeElement ) return
    localState.alternateShowOptions()
    setTimeout(() => {
      optionsRef?.current?.focus()
    }, 0)
  }

  const handleKeyUp = (e) => {

    e.preventDefault(); //Prevent scroll while using arrow keys
    
    const actions = {
      'Escape': () => {
        selectedRef?.current?.focus()
        localState.hideOptions()
      },
      'ArrowUp': () => setLocalState( state => ({
        ...state,
        indexSelected: state.indexSelected === 0 ? options.length - 1 : state.indexSelected - 1
      })),
      'ArrowDown': () => setLocalState( state => ({
          ...state,
          indexSelected: state.indexSelected === (options.length - 1) ? 0 : state.indexSelected + 1
        })
      ),
      'Enter': () => handleOnClick( localState.indexSelected )
    }
    
    actions[e.key]?.()
  }

  return (
    <div  className={`relative z-50  ${width || 'w-full'}`}>

      <button 
        ref={ selectedRef }
        onClick={ handleButtonSelected } 
        onKeyDown={ handleKeyUp }
        className={`flex items-center justify-between text-base py-1 px-2 notify-badge w-full outline-none focus:outline-none ${localState.isShowingOptions ? 'rounded-t-md' : 'rounded-md'}`}
      > 
        <h2 className="w-full text-start truncate">
          { options[localState.indexSelected] } 
        </h2>
        <ChevronRightIcon className={`w-5 h-5 duration-75 ${localState.isShowingOptions ? 'rotate-90' : ''}`}/>
      </button>
      
      { localState.isShowingOptions &&
          <div ref={ optionsRef } tabIndex="0" onBlur={ handleButtonSelected } onKeyDown={ handleKeyUp }
            className='absolute outline-none focus:outline-none w-full text-black bg-white rounded-b overflow-hidden left-1/2 -translate-x-1/2 '>
            {
              options.map( (type, i) => (
                <h3 
                  
                  key={type} 
                  onClick={ () => handleOnClick( i ) }
                  className={`${localState.indexSelected === i ? 'bg-gray-300' : 'hover:bg-gray-200'}  cursor-pointerw-auto flex text-nowrap justify-start items-center gap-x-2 py-1 px-2 duration-150`}
                  title={type}
                  tabIndex="0"
                  onBlur={ handleButtonSelected }
                >
                    { localState.showIndex && <span className="font-light">{ i + 1 }</span> }
                    <span className="truncate">{type}</span>
                </h3>
              ))
            }
          </div>

      }
    </div>
  )
}

export default CustomSelect2