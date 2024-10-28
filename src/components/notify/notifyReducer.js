

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
  screenPosition: 'top-right'
}

const actions = {
    
  ADD_NOTIFY: ( state, action ) =>  ({ ...state, notifies: [ action.payload, ...state.notifies ]}),

  REMOVE_NOTIFY: ( state, action ) => ({ ...state, notifies: state.notifies.filter( notify => notify.id != action.payload ) }),

  IS_OPENING_FALSE: ( state, action ) => ({ ...state, notifies: state.notifies.map( n => n.id === action.payload 
    ? { ...n, state: { ...(n.state), isOpening: false } } 
    : n 
  )}),
  

  IS_CLOSING_TRUE: ( state, action ) => ({ ...state, notifies: state.notifies.map( n => n.id === action.payload 
    ? { ...n, state: { ...(n.state), isClosing: true } }
    : n
  )}),
  
  IS_OPEN_FALSE: ( state, action ) => ({ ...state, notifies: state.notifies.map( n => n.id === action.payload
    ? { ...n, state: { ...(n.state), isOpen: false } }
    : n
  )}),
  
  SET_NOTIFIES_POSITION: ( state, action ) => {  

    if( !positions[ action.payload ]) return {...state}

    return {
      ...state,
      screenPositionStyle: positions[ action.payload ],
      screenPosition: action.payload
    } },
}

const notifyReducer = ( state = initialState, action ) => {
  return actions[action.type] ? actions[action.type]( state, action ) : state
}

export default notifyReducer