import React, { useEffect, useRef, useState } from 'react'
import { ChevronRightIcon } from '../../assets/icons/chevron-right'
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import './styles.css';


const CustomSelect2 = ( { 
  options = ['You need to pass an array of options...'], 
  showIndex = false, 
  width = 'w-full',
  maxHeight = 'max-h-[300px]', 
  autoHide = false,
} ) => {

  const [localState, setLocalState] = useState({
    indexSelected: 0,
    isShowingOptions: false,
    showIndex: showIndex ?? false,

    hideOptions: () => setLocalState(state => ({ ...state, isShowingOptions: false })),
    showOptions: () => setLocalState(state => ({ ...state, isShowingOptions: true })),
    alternateShowOptions: () => setLocalState(state => ({ ...state, isShowingOptions: !state.isShowingOptions })),
  })

  const optionsContainerRef = useRef(null);
  const optionRefs = useRef([]);
  const selectedRef = useRef(null);

  const handleOnClick = ( index ) => {
    setLocalState({
      ...localState, 
      indexSelected: index, 
      isShowingOptions: false,
    })
  }

  const handleButtonSelected = () => localState.alternateShowOptions()


  const handleKeyDown = (e) => {
    e.preventDefault(); // Prevent default scrolling behavior for body
  
    const actions = {
      Escape: () => {
        selectedRef?.current?.focus();
        localState.hideOptions();
      },
      ArrowUp: () => {
        setLocalState((state) => {
          const newIndex = state.indexSelected === 0 ? options.length - 1 : state.indexSelected - 1;
          optionRefs.current[newIndex]?.scrollIntoView({ block: 'nearest'})
          return { ...state, indexSelected: newIndex };
        });
      },
      ArrowDown: () => {
        setLocalState((state) => {
          const newIndex = (state.indexSelected === options.length - 1) ? 0 : state.indexSelected + 1;
          optionRefs.current[newIndex]?.scrollIntoView({ block: 'nearest'})
          return { ...state, indexSelected: newIndex };
        })
      },
      Enter: () => {
        localState.alternateShowOptions();
      },
    };
  
    actions[e.key]?.();
  };
  


  const handleClickOutside = (event) => {
    if (
      optionsContainerRef.current &&
      !optionsContainerRef.current.contains(event.target) &&
      selectedRef.current &&
      !selectedRef.current.contains(event.target)
    ) {
      setLocalState((state) => ({ ...state, isShowingOptions: false }));
    }
  };

  useEffect(() => {
    if (localState.isShowingOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [localState.isShowingOptions]);



  return (
    <div  className={`relative z-50  ${width || 'w-full'}`}>

      <button 
        ref={ selectedRef }
        onClick={ handleButtonSelected } 
        onKeyDown={ handleKeyDown }
        className={`flex items-center justify-between text-base py-1 px-2 notify-badge shadow-sm w-full outline-none focus:outline-none focus:ring-2  ${localState.isShowingOptions ? 'rounded-t-md' : 'rounded-md'}`}
      > 
        <h2 className="w-full text-start truncate">
          { options[localState.indexSelected] } 
        </h2>
        <ChevronRightIcon className={`w-5 h-5 duration-75 ${localState.isShowingOptions ? 'rotate-90' : ''}`}/>
      </button>
      
      { localState.isShowingOptions && 
        <div 
          ref={ optionsContainerRef } 
          tabIndex="1" //Make it focusable
          className='absolute outline-none focus:outline-none w-full max-h-[300px] overflow-y-auto text-black bg-white rounded-b left-1/2 -translate-x-1/2 '
        >
          <SimpleBar className={ maxHeight } autoHide={ autoHide } >
            {
              options.map( (type, i) => (
                <h3 
                  key={ i } 
                  ref={(el) => (optionRefs.current[i] = el)}
                  onClick={ () => handleOnClick( i ) }
                  className={`${localState.indexSelected === i ? 'bg-gray-300' : 'hover:bg-gray-200'}  cursor-pointerw-auto flex text-nowrap justify-start items-center gap-x-2 py-1 px-2 duration-0`}
                  title={type}
                  tabIndex="0"
                >
                    { localState.showIndex && <span className="font-light">{ i + 1 }</span> }
                    <span className="truncate">{type}</span>
                </h3>
              ))
            }
          </SimpleBar>
        </div>
      }
    </div>
  )
}

export default CustomSelect2