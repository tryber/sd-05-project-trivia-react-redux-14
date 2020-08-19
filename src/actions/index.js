import serviceAPI from '../services/serviceAPI';

export const LOGIN = 'LOGIN';
export const REQUEST_API_DATA = 'REQUEST_API_DATA';
export const RECEIVE_API_DATA_SUCCESS = 'RECEIVE_API_DATA_SUCCESS';
export const RECEIVE_API_DATA_FAILURE = 'RECEIVE_API_DATA_FAILURE';

export const handleSubmit = (login) => ({
  type: LOGIN,
  login,
});

const requestAPIdata = () => ({
  type: REQUEST_API_DATA,
});

const receiveAPIdataSuccess = (data) => ({
  type: RECEIVE_API_DATA_SUCCESS,
  token: data.token,
});

const receiveAPIdataFailure = (error) => ({
  type: RECEIVE_API_DATA_FAILURE,
  error,
});

export function fetchToken() {
  return (dispatch) => {
    dispatch(requestAPIdata());

    serviceAPI()
      .then(
        (data) => dispatch(receiveAPIdataSuccess(data)),
        (error) => dispatch(receiveAPIdataFailure(error)),
      );
  };
}
