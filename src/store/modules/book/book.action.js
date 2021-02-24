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
