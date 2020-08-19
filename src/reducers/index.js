import { LOGIN } from '../actions';
import { combineReducers } from 'redux';

const INITIAL_STATE = {
  name: '',
  email: '',
  hash: '',
}

function loginReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case LOGIN:
      return {
        ...state,
        login: {
          name: action.login.name,
          email: action.login.email,
          hash: action.login.hash,
        }
      };
  
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  loginReducer,
})

export default rootReducer;
