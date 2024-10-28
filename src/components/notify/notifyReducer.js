

export const positions = {
  'top-right': 'top-20 right-4',
  'bottom-right': 'bottom-1 right-1 flex-col-reverse',
  'bottom-center': 'bottom-1 left-1/2 -translate-x-1/2 flex-col-reverse',
  'bottom-left': 'bottom-1 left-1 flex-col-reverse',
  'top-left': 'top-20 left-1',
  'top-center': 'top-20 left-1/2 -translate-x-1/2',
}

const initialState = { 
  notifies: [],
  screenPositionStyle: 'top-20 right-4',
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
    
    const pos = positions[ action.payload ]

    return {
      ...state,
      screenPositionStyle: pos ?? 'top-20 right-4',
      screenPosition: pos ? action.payload : 'top-right'
    } },
}

const notifyReducer = ( state = initialState, action ) => {
  return actions[action.type] ? actions[action.type]( state, action ) : state
}

export default notifyReducer