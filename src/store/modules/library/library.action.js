import * as libraryTypes from './library.types';
import API_ROUTE from '../../../apiRoute';
import axios from 'axios';

const LIBRARY_API_ROUTE = `${API_ROUTE}/library`;

export const getLibraries = () => {
  return async (dispatch) => {
    dispatch({ type: libraryTypes.GET_LIBRARIES_REQUEST });
    try {
      const res = await axios.get(`${LIBRARY_API_ROUTE}/libraries`);
      console.log(res);
      dispatch({
        type: libraryTypes.GET_LIBRARIES_SUCCESS,
        payload: { data: res.data.data },
      });
    } catch (err) {
      dispatch({ type: libraryTypes.LIBRARY_ERROR, payload: err });
    }
  };
};

export const addLibrary = ({ formData }) => {
  return async (dispatch) => {
    dispatch({ type: libraryTypes.ADD_LIBRARY_REQUEST });
    try {
      const res = await axios.post(`${LIBRARY_API_ROUTE}`, formData);
      dispatch({
        type: libraryTypes.ADD_LIBRARY_SUCCESS,
        payload: { data: res.data.data, message: res.data.message },
      });
    } catch (err) {
      dispatch({ type: libraryTypes.LIBRARY_ERROR, payload: err });
    }
  };
};

export const deleteLibrary = ({ libraryId }) => {
  return async (dispatch) => {
    dispatch({ type: libraryTypes.DELETE_LIBRARY_REQUEST });
    try {
      const res = await axios.delete(`${LIBRARY_API_ROUTE}/${libraryId}`);
      dispatch({
        type: libraryTypes.DELETE_LIBRARY_SUCCESS,
        payload: { data: res.data.data, message: res.data.message },
      });
    } catch (err) {
      dispatch({ type: libraryTypes.LIBRARY_ERROR, payload: err });
    }
  };
};

export const updateLibrary = ({ libraryId, updateData }) => {
  return async (dispatch) => {
    dispatch({ type: libraryTypes.UPDATE_LIBRARY_REQUEST });
    try {
      const res = await axios.put(
        `${LIBRARY_API_ROUTE}/${libraryId}`,
        updateData
      );
      console.log(res.data.data);
      dispatch({
        type: libraryTypes.UPDATE_LIBRARY_SUCCESS,
        payload: { data: res.data.data, message: res.data.message },
      });
    } catch (err) {
      dispatch({ type: libraryTypes.LIBRARY_ERROR, payload: err });
    }
  };
};
