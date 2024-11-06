

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
    
  /**
   * ADD_NOTIFY: adds a notification.
   * This is used when a notification needs to be added.
   * The new notification is added at the beginning of the array.
   * If the length of the array exceeds maxLength, the oldest notification is removed.
   * @param {{ notifies: Notify[], maxLength: number }} state - current state
   * @param {{ payload: Notify }} action - action payload
   * @returns {{ notifies: Notify[] }} - new state
   */
  ADD_NOTIFY: ( state, action ) =>  (
    {
      ...state, 
      notifies: [ action.payload, ...state.notifies ]
    }
  ),

  /**
   * REMOVE_NOTIFY: removes a notification.
   * This is used when a notification needs to be removed.
   * @param {state} current state of the notifyReducer
   * @param {action} action object with payload containing the notification id
   * @returns new state with removed notification
   */
  REMOVE_NOTIFY: ( state, action ) => (
    {
      ...state, 
      notifies: state.notifies.filter( notify => notify.id !== action.payload ) 
    }
  ),

  /**
   * UPDATE_NOTIFY: updates a notification.
   * This is used when a notification's properties need to be changed.
   * @param {state} current state of the notifyReducer
   * @param {action} action object with payload containing the new notification object
   * @returns new state with updated notification
   */
  UPDATE_NOTIFY: ( state, action ) => (
    {
      ...state, 
      notifies: state.notifies.map( n => n.id === action.payload.id ? action.payload : n ) 
    }
  ),

/**
 * IS_OPENING_FALSE: sets a notification as opening false.
 * This is used to mark a notification's opening transition as complete.
 * @param {state} current state of the notifyReducer
 * @param {action} action object with payload containing the notification id
 * @returns new state with updated notification state
 */
  IS_OPENING_FALSE: ( state, action ) => (
    {
      ...state, 
      notifies: state.notifies.map( n => n.id === action.payload 
        ? { ...n, state: { ...(n.state), isOpening: false } } 
        : n 
      )
    }
  ),
  

  /**
   * IS_CLOSING_TRUE: sets a notification as closing true.
   * This is used when a notification is about to be removed.
   * @param {state} current state of the notifyReducer
   * @param {action} action object with payload containing the notification id
   * @returns new state with updated notification state
   */
  IS_CLOSING_TRUE: ( state, action ) => (
    {
      ...state, 
      notifies: state.notifies.map( n => n.id === action.payload 
        ? { ...n, state: { ...(n.state), isClosing: true } }
        : n
      )
    }
  ),
  
  /**
   * IS_OPEN_FALSE: sets a notification as open false.
   * This is used when a notification is removed or closed.
   * @param {state} current state of the notifyReducer
   * @param {action} action object with payload containing the notification id
   * @returns new state with updated notification state
   */
  IS_OPEN_FALSE: ( state, action ) => (
    {
      ...state, 
      notifies: state.notifies.map( n => n.id === action.payload
        ? { ...n, state: { ...(n.state), isOpen: false } }
        : n
      )
    }
  ),
  
  /**
   * SET_NOTIFIES_POSITION: sets the notify container position. 
   * 
   * @param {state} current state of the notifyReducer
   * @param {action} action object with payload containing the new position string
   * @returns new state with updated screenPositionStyle and screenPosition
   */
  SET_NOTIFIES_POSITION: ( state, action ) => {  

    if( !positions[ action.payload ]) return {...state}

    return {
      ...state,
      screenPositionStyle: positions[ action.payload ],
      screenPosition: action.payload
    } },


  /**
   * SET_MAX_LENGTH: sets the maximum number of notifications allowed.
   * It ensures that the maxLength is within the range of 1 to 20.
   * If the provided payload is not valid, it defaults to 7.
   * 
   * @param {state} current state of the notifyReducer
   * @param {action} action object with payload containing the desired maxLength
   * @returns new state with updated maxLength
   */
  SET_MAX_LENGTH: ( state, action ) => ({
    ...state,
    maxLength: Math.min(15, Math.max(1, action.payload ?? 7))
  }),
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