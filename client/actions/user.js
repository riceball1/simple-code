import 'babel-polyfill';
import 'isomorphic-fetch';
const ROOT_URL = location.origin;

//Get current user(me) from token in localStorage
export const ME_FROM_TOKEN = 'ME_FROM_TOKEN';
export const ME_FROM_TOKEN_SUCCESS = 'ME_FROM_TOKEN_SUCCESS';
export const ME_FROM_TOKEN_FAILURE = 'ME_FROM_TOKEN_FAILURE';
export const RESET_TOKEN = 'RESET_TOKEN';

export const meFromToken = (tokenFromStorage) => dispatch => {
  //check if the token is still valid, if so, get me from the server

  const url = `${ROOT_URL}/me/from/token?token=${tokenFromStorage}`;
    const postRequest = new Request(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${tokenFromStorage}`
        })
    });

    return fetch(postRequest)
        .then(response => {
            if (!response.ok) {
                let error = new Error(response.statusText)
                error = response
                console.log(error)
            }
            return response;
        })
        .then(response => response.json()) // not giving back correct data
        .then(data => {
            // data.user doesn't exist
            dispatch(meFromTokenSuccess(data))
        })
        .catch(error => {
          dispatch(meFromTokenFailure(error))
        });
}

export const meFromTokenSuccess = (user) => {
  return {
    type: ME_FROM_TOKEN_SUCCESS,
    payload: user
  };
}

export const meFromTokenFailure = (error) => {
  return {
    type: ME_FROM_TOKEN_FAILURE,
    payload: error
  };
}

export const resetToken = () =>  {//used for logout
  return {
    type: RESET_TOKEN
  };
}

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const signupSuccess = ((user) => ({
    type: SIGNUP_SUCCESS,
    payload: user
}))

export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const signupError = ((error) => ({
    type: SIGNUP_ERROR,
    payload: error
}))

export const signup = (userData) => dispatch => {
    const newUser = Object.assign({}, userData);
        
    const url = `${ROOT_URL}/signup`;
    const postRequest = new Request(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(newUser),
    });
    
    return fetch(postRequest)
        .then(response => {
            if (!response.ok) {
                const error = new Error(response.statusText)
                error.response = response
                console.log(error.response);
            }
            return response;
        })
        .then(response =>(response.json())) // to get the json
        .then(data => {
            // console.log("Signup Async Action", data);
            sessionStorage.setItem('jwtToken', data.token);
            dispatch(signupSuccess(data.user))
        })
        .catch(error => {
            console.log("error: ", error);
            dispatch(signupError(error))
        });
};

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = ((user) => ({
    type: LOGIN_SUCCESS,
    payload: user
}))

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const loginError = ((error) => ({
    type: LOGIN_ERROR,
    payload: error
}))

export const login = (username, password) => dispatch => {
    const url = `${ROOT_URL}/login`;
    const postRequest = new Request(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({username, password}),
    });
    
    return fetch(postRequest)
        .then(response => {
            if (!response.ok) {
                let error = new Error(response.statusText)
                error = response
                console.log(error);
            }
            return response;
        })
        .then(response => (response.json())) // to get the json
        .then(data => {
            sessionStorage.setItem('jwtToken', data.token);
            dispatch(loginSuccess(data.user))
        })
        .catch(error => {
            dispatch(loginError(error))
        });
};
