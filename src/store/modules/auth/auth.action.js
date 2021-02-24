import * as authTypes from './auth.types';
import API_ROUTE from '../../../apiRoute';
import setAuthorizationToken from '../../../helpers/authorization';
import { history } from '../../../history';
import axios from 'axios';

function handleErrors(err) {
  if (Array.isArray(err)) {
    return err.reduce((acc, cur) => {
      return acc + cur.msg;
    }, '');
  } else {
    return err.msg;
  }
}

export const SignIn = (credentials) => {
  return async (dispatch) => {
    dispatch({ type: authTypes.LOGIN_REQUEST });

    try {
      const res = await axios.post(`${API_ROUTE}/auth/login`, credentials);
      const userData = res.data;
      localStorage.setItem('token', userData.jwtToken);
      localStorage.setItem('user_data', JSON.stringify(userData));
      setAuthorizationToken(userData.jwtToken);
      dispatch({ type: authTypes.LOGIN_SUCCESS, payload: userData });
    } catch (err) {
      const errMsg = handleErrors(err.response.data);
      dispatch({ type: authTypes.AUTH_ERROR, payload: errMsg });
    }
  };
};

export const SignOut = () => {
  return (dispatch) => {
    dispatch({ type: authTypes.LOGOUT_REQUEST });
    try {
      localStorage.removeItem('token');
      setAuthorizationToken(false);
      dispatch({ type: authTypes.LOGOUT_SUCCESS });
      window.localStorage.clear(); //update the localstorage
      history.push('/login');
    } catch (err) {
      dispatch({
        type: authTypes.AUTH_ERROR,
        payload: err.response.data.error,
      });
    }
  };
};
