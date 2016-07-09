import { List } from 'immutable';

// ------------------------------------
// Constants
// ------------------------------------
export const PLACE_PEG = 'PLACE_PEG';
export const INIT_BOARD = 'INIT_BOARD';
export const REMOVE_PEG = 'REMOVE_PEG';

// ------------------------------------
// Actions
// ------------------------------------
export function placePeg (value) {
  return {
    type: PLACE_PEG,
    payload: value
  }
}

export function initBoard(value) {
  return {
    type: INIT_BOARD,
    payload: value
  }
}

export function removePeg (value) {
  return {
    type: REMOVE_PEG,
    payload: value
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!

    NOTE: This is solely for demonstration purposes. In a real application,
    you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
    reducer take care of this logic.  */


export const actions = {
  placePeg,
  removePeg,
  initBoard
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [PLACE_PEG]: (state, { payload }) => state.setIn([payload.y, payload.x], payload.peg),
  [INIT_BOARD]: (state, { payload }) => List().setSize(payload.height).map(() => List().setSize(payload.width).map(() => false)),
  [REMOVE_PEG]: (state, { payload }) => {
    console.log(payload);
    return state.setIn([payload.y, payload.x], false)
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null;

export default function pegboardReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
