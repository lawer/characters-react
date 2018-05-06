import {INVALIDATE_CHARACTERS, RECEIVE_CHARACTERS, REQUEST_CHARACTERS, SET_TOKEN} from './constants'

const initialState = {
  characters: [],
  token: '',
  isFetching: false,
  invalidated: true
};

function rootReducer(state = initialState, action) {
  switch (action.type) {

    case REQUEST_CHARACTERS:
      return {
        ...state,
        isFetching: true
      };

    case RECEIVE_CHARACTERS:
      const {characters} = action.payload;
      return {
        ...state,
        characters: characters,
        isFetching: false,
        invalidated: false
      };

    case SET_TOKEN:
      const {token} = action.payload;
      return {
        ...state,
        token: token
      };

    case INVALIDATE_CHARACTERS:
      return {
        ...state,
        invalidated: true
      };

    default:
      return state;
  }
}

export {rootReducer}