import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_USER
} from './types';


//====================================================================================

/*
  FUNCTIONS:
    - registerUser
    - loginUser
    - updateFirst
    - updateAvatar
    - setCurrentUser
    - logoutUser
*/

//====================================================================================

// Register User
export const getCurrentUser = () => dispatch => {
  axios
    .get('/api/users/current')
    .then(res =>
      dispatch({
        type: GET_USER,
        payload: res.data
      }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(_res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Save to localStorage
      const {
        token
      } = res.data;
      // Set token to ls
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('first', res.data.first);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Used to change status when user creates profile
export const updateFirst = userData => _dispatch => {
  axios
    .post('/api/users/updateFirst', userData)
}

//Update the users avatar
export const updateAvatar = avatarData => _dispatch => {
  axios
    .post('/api/users/updateAvatar', avatarData)
}

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

//====================================================================================