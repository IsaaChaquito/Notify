import React, { useEffect, useRef, useState } from 'react'
import { ChevronRightIcon } from '../../assets/icons/chevron-right'
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import './styles.css';


const CustomSelect2 = ( { 
  options = ['Require an array of options...'], 
  value,
  setValue,
  showIndex = false, 
  width = 'w-full',
  maxHeight = 'max-h-[300px]', 
  autoHide = false,
} ) => {

  const [localState, setLocalState] = useState({
    indexSelected: options.findIndex((option) => option === value),
    isShowingOptions: false,
    showIndex: showIndex ?? false,
  });
  

  const alternateShowOptions = () => setLocalState((state) => ({ ...state, isShowingOptions: !state.isShowingOptions }));

  const hideOptions = () => setLocalState((state) => ({ ...state, isShowingOptions: false }));
  
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

  useEffect(() => setValue( options[localState.indexSelected] ), [localState.indexSelected])

  const handleButtonSelected = () => alternateShowOptions()

  const handleKeyDown = (e) => {
    e.preventDefault(); // Prevent default scrolling behavior for body
  
    const actions = {
      Escape: () => {
        selectedRef?.current?.focus();
        hideOptions()
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
        alternateShowOptions();
      },
    };
  
    actions[e.key]?.();
  };
  


  /**
   * Handles clicks outside the options container. If the user clicks outside the container and the selected
   * element, the options are hidden.
   * @param {MouseEvent} event The event of the click outside the container.
   */
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
        ref={selectedRef}
        onClick={handleButtonSelected}
        onKeyDown={handleKeyDown}
        className="peer relative w-full flex items-center justify-between cursor-pointer rounded-sm bg-white py-1.5 pl-3 pr-1 text-gray-900 shadow-md ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 "
      >
        {/* <span className="flex items-center"> */}
          <span className=" block truncate">{options[localState.indexSelected]}</span>
        {/* </span> */}
        <ChevronRightIcon
          className={`w-5 h-5 text-gray-400 duration-75 ${localState.isShowingOptions ? 'rotate-90' : ''}`}
        />
      </button>



      
      { localState.isShowingOptions && 
        <div 
          ref={ optionsContainerRef } 
          tabIndex="1" //Make it focusable
          className='translate-y-1 absolute outline-none focus:outline-none w-full max-h-[300px] overflow-y-auto text-black bg-white rounded left-1/2 -translate-x-1/2 '
        >
          <SimpleBar className={ maxHeight } autoHide={ autoHide } >
            {
              options.map( (type, i) => (
                <h3 
                  key={ i } 
                  ref={(el) => (optionRefs.current[i] = el)}
                  onClick={ () => handleOnClick( i ) }
                  className={`${localState.indexSelected === i ? 'bg-gray-300 font-medium' : 'hover:bg-gray-200'}  cursor-pointer w-auto flex text-nowrap justify-start items-center gap-x-2 px-2 py-1.5`}
                  title={type}
                  tabIndex="0"
                >
                    { localState.showIndex && <span className="font-light">{ i + 1 }</span> }
                    <span className="block truncate">{type}</span>
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