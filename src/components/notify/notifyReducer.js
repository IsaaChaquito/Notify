

export const positions = {
  'top-right': 'flex-col items-end',
  'bottom-right': 'flex-col-reverse items-end',
  'bottom-center': 'flex-col-reverse items-center',
  'bottom-left': 'flex-col-reverse items-start',
  'top-left': 'flex-col items-start',
  'top-center': 'flex-col items-center',
}


const initialState = {
  notifies: [],
  screenPositionStyle: positions['top-right'],
  screenPosition: 'top-right',
  maxLength: 7,
}


const actions = {
    
  ADD_NOTIFY: ( state, action ) =>  (
    {
      ...state, 
      notifies: [ action.payload, ...state.notifies ]
    }
  ),

  REMOVE_NOTIFY: ( state, action ) => (
    {
      ...state, 
      notifies: state.notifies.filter( notify => notify.id !== action.payload ) 
    }
  ),

  UPDATE_NOTIFY: ( state, action ) => (
    {
      ...state, 
      notifies: state.notifies.map( n => n.id === action.payload.id ? action.payload : n ) 
    }
  ),

  IS_OPENING_FALSE: ( state, action ) => (
    {
      ...state, 
      notifies: state.notifies.map( n => n.id === action.payload 
        ? { ...n, state: { ...(n.state), isOpening: false } } 
        : n 
      )
    }
  ),
  

  IS_CLOSING_TRUE: ( state, action ) => (
    {
      ...state, 
      notifies: state.notifies.map( n => n.id === action.payload 
        ? { ...n, state: { ...(n.state), isClosing: true } }
        : n
      )
    }
  ),
  
  IS_OPEN_FALSE: ( state, action ) => (
    {
      ...state, 
      notifies: state.notifies.map( n => n.id === action.payload
        ? { ...n, state: { ...(n.state), isOpen: false } }
        : n
      )
    }
  ),
  
  SET_NOTIFIES_POSITION: ( state, action ) => {  

    if( !positions[ action.payload ]) return {...state}

    return {
      ...state,
      screenPositionStyle: positions[ action.payload ],
      screenPosition: action.payload
    } },

  SET_MAX_LENGTH: ( state, action ) => ({ ...state, maxLength: action.payload })
}



/**
 * The reducer function for the notify state.
 * It takes a state and an action as arguments and returns a new state.
 * It uses the actions object to determine the correct action to take
 * based on the type of the action.
 * If the action is not recognized, it returns the original state.
 * @param {object} state - The notify state to be updated.
 * @param {object} action - The action to be performed on the state.
 * @returns {object} - The new notify state.
 */
const notifyReducer = ( state = initialState, action ) => {
  return actions[action.type] ? actions[action.type]( state, action ) : state
}

export default notifyReducer