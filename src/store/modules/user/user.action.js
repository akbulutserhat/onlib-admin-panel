import * as userTypes from './user.types';
import API_ROUTE from '../../../apiRoute';
import axios from 'axios';

const USER_API_ROUTE = `${API_ROUTE}/user`;

export const getUsers = ({ page, limit }) => {
  return async (dispatch) => {
    dispatch({ type: userTypes.GET_USERS_REQUEST });
    try {
      const res = await axios.get(
        `${USER_API_ROUTE}/users/page=${page}&limit=${limit}`
      );
      dispatch({
        type: userTypes.GET_USERS_SUCCESS,
        payload: { data: res.data.data, count: res.data.count },
      });
    } catch (err) {
      dispatch({ type: userTypes.USER_ERROR, payload: err });
    }
  };
};

export const addUser = ({ fullName, email, role, password }) => {
  return async (dispatch) => {
    dispatch({ type: userTypes.ADD_USER_REQUEST });
    try {
      const res = await axios.post(`${API_ROUTE}/auth/signup`, {
        fullName,
        email,
        role,
        password,
      });
      dispatch({
        type: userTypes.ADD_USER_SUCCESS,
        payload: { data: res.data.data, message: res.data.message },
      });
    } catch (err) {
      dispatch({ type: userTypes.USER_ERROR, payload: err });
    }
  };
};

export const deleteUser = ({ userId }) => {
  return async (dispatch) => {
    dispatch({ type: userTypes.DELETE_USER_REQUEST });
    try {
      const res = await axios.delete(`${USER_API_ROUTE}/${userId}`);
      dispatch({
        type: userTypes.DELETE_USER_SUCCESS,
        payload: { data: res.data.data, message: res.data.message },
      });
    } catch (err) {
      dispatch({ type: userTypes.USER_ERROR, payload: err });
    }
  };
};

export const updateUser = ({ userId, updateData }) => {
  return async (dispatch) => {
    dispatch({ type: userTypes.UPDATE_USER_REQUEST });
    try {
      const res = await axios.put(`${USER_API_ROUTE}/${userId}`, updateData);
      dispatch({
        type: userTypes.UPDATE_USER_SUCCESS,
        payload: { data: res.data.data, message: res.data.message },
      });
    } catch (err) {
      dispatch({ type: userTypes.USER_ERROR, payload: err });
    }
  };
};
