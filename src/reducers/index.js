import { LOGIN } from '../actions';
import { combineReducers } from 'redux';

const INITIAL_STATE = {
  login: {
    nome: '',
    email: '',
    hash: '',
    placar: 0,
  }
}

function loginReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case LOGIN:
      return {
        ...state,
        login: {
          nome: action.login.nome,
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
