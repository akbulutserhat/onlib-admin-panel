import * as bookTypes from './book.types';
import API_ROUTE from '../../../apiRoute';
import axios from 'axios';

const BOOK_API_ROUTE = `${API_ROUTE}/book`;

export const getBooks = ({ page, limit }) => {
  return async (dispatch) => {
    dispatch({ type: bookTypes.GET_BOOKS_REQUEST });
    try {
      const res = await axios.get(
        `${BOOK_API_ROUTE}/books/page=${page}&limit=${limit}`
      );
      dispatch({
        type: bookTypes.GET_BOOKS_SUCCESS,
        payload: { data: res.data.data, count: res.data.count },
      });
    } catch (err) {
      dispatch({ type: bookTypes.BOOK_ERROR, payload: err });
    }
  };
};

export const addBook = ({ formData }) => {
  return async (dispatch) => {
    dispatch({ type: bookTypes.ADD_BOOK_REQUEST });
    try {
      const res = await axios.post(`${BOOK_API_ROUTE}`, formData);
      dispatch({
        type: bookTypes.ADD_BOOK_SUCCESS,
        payload: { data: res.data.data, message: res.data.message },
      });
    } catch (err) {
      dispatch({ type: bookTypes.BOOK_ERROR, payload: err });
    }
  };
};

export const deleteBook = ({ bookId }) => {
  return async (dispatch) => {
    dispatch({ type: bookTypes.DELETE_BOOK_REQUEST });
    try {
      console.log(bookId);
      const res = await axios.delete(`${BOOK_API_ROUTE}/${bookId}`);
      dispatch({
        type: bookTypes.DELETE_BOOK_SUCCESS,
        payload: { data: res.data.data, message: res.data.message },
      });
    } catch (err) {
      dispatch({ type: bookTypes.BOOK_ERROR, payload: err });
    }
  };
};

export const updateBook = ({ bookId, updateData }) => {
  return async (dispatch) => {
    dispatch({ type: bookTypes.UPDATE_BOOK_REQUEST });
    try {
      const res = await axios.put(`${BOOK_API_ROUTE}/${bookId}`, updateData);
      dispatch({
        type: bookTypes.UPDATE_BOOK_SUCCESS,
        payload: { data: res.data.data, message: res.data.message },
      });
    } catch (err) {
      dispatch({ type: bookTypes.BOOK_ERROR, payload: err });
    }
  };
};
