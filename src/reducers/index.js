import { combineReducers } from 'redux';
import { LOGIN, REQUEST_API_DATA, RECEIVE_API_DATA_SUCCESS, RECEIVE_API_DATA_FAILURE, RECEIVE_QUESTIONS_FROM_API, REQUEST_QUESTIONS } from '../actions';

const INITIAL_STATE_LOGIN = {
  login: {
    nome: '',
    email: '',
    hash: '',
    placar: 0,
  },
};

const INITIAL_STATE_TOKEN = {
  token: '',
  questions: [],
  isFetching: false,
};

function loginReducer(state = INITIAL_STATE_LOGIN, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        login: {
          nome: action.login.nome,
          email: action.login.email,
          hash: action.login.hash,
          placar: action.login.placar,
        },
      };
    default:
      return state;
  }
}

function tokenReducer(state = INITIAL_STATE_TOKEN, action) {
  switch (action.type) {
    case REQUEST_API_DATA:
      return { ...state, isFetching: true };
    case RECEIVE_API_DATA_SUCCESS:
      return {
        ...state,
        token: action.token,
        isFetching: false,
      };
    case RECEIVE_API_DATA_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    case REQUEST_QUESTIONS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_QUESTIONS_FROM_API:
      return {
        ...state,
        questions: action.questions,
        isFetching: false,
      };
    default: return state;
  }
}

const rootReducer = combineReducers({
  loginReducer,
  tokenReducer,
});

export default rootReducer;
