import axios from 'axios';
import * as detailTypes from './detail.types';
import API_ROUTE from '../../../../apiRoute';

const LIBRARY_API_ROUTE = `${API_ROUTE}/library`;

export const getLibraryDetail = ({ libraryId }) => {
  return async (dispatch) => {
    dispatch({ type: detailTypes.GET_LIBRARY_DETAIL_REQUEST });
    try {
      const res = await axios.get(
        `${LIBRARY_API_ROUTE}/attendant/${libraryId}`
      );
      dispatch({
        type: detailTypes.GET_LIBRARY_DETAIL_SUCCESS,
        payload: { data: res.data.data },
      });
    } catch (err) {
      dispatch({ type: detailTypes.LIBRARY_DETAIL_ERROR, payload: err });
    }
  };
};

export const updateBookStock = ({ libraryId, bookId, newStock }) => {
  return async (dispatch) => {
    dispatch({ type: detailTypes.UPDATE_BOOK_STOCK_REQUEST });
    try {
      const res = await axios.put(
        `${LIBRARY_API_ROUTE}/book/${libraryId}/${bookId}`,
        { newStock }
      );
      dispatch({
        type: detailTypes.UPDATE_BOOK_STOCK_SUCCESS,
        payload: { data: res.data.data },
      });
    } catch (err) {
      dispatch({ type: detailTypes.LIBRARY_DETAIL_ERROR, payload: err });
    }
  };
};

export const updateOrderStatus = ({ libraryId, orderId, status }) => {
  return async (dispatch) => {
    dispatch({ type: detailTypes.UPDATE_ORDER_STATUS_REQUEST });
    try {
      const res = await axios.put(
        `${LIBRARY_API_ROUTE}/order/${libraryId}/${orderId}`,
        { status }
      );
      dispatch({
        type: detailTypes.UPDATE_ORDER_STATUS_SUCCESS,
        payload: { data: res.data.data },
      });
    } catch (err) {
      dispatch({ type: detailTypes.LIBRARY_DETAIL_ERROR, payload: err });
    }
  };
};

export const addUserToLibrary = ({ libraryId, userId, userData }) => {
  return async (dispatch) => {
    dispatch({ type: detailTypes.ADD_USER_TO_LIBRARY_REQUEST });
    try {
      const res = await axios.put(
        `${LIBRARY_API_ROUTE}/user/${libraryId}/${userId}`,
        { userData }
      );
      dispatch({
        type: detailTypes.ADD_USER_TO_LIBRARY_SUCCESS,
        payload: { data: res.data.data },
      });
    } catch (err) {
      dispatch({ type: detailTypes.LIBRARY_DETAIL_ERROR, payload: err });
    }
  };
};

export const addBookToLibrary = ({ libraryId, bookId }) => {
  return async (dispatch) => {
    dispatch({ type: detailTypes.ADD_LIBRARY_BOOK_REQUEST });
    try {
      const res = await axios.put(
        `${LIBRARY_API_ROUTE}/book/add/${libraryId}/${bookId}`
      );
      dispatch({
        type: detailTypes.ADD_LIBRARY_BOOK_SUCCESS,
        payload: { data: res.data.data },
      });
    } catch (err) {
      dispatch({ type: detailTypes.LIBRARY_DETAIL_ERROR, payload: err });
    }
  };
};

export const deleteBookFromLibrary = ({ libraryId, bookId }) => {
  return async (dispatch) => {
    dispatch({ type: detailTypes.DELETE_LIBRARY_BOOK_REQUEST });
    try {
      const res = await axios.put(
        `${LIBRARY_API_ROUTE}/book/delete/${libraryId}/${bookId}`
      );
      dispatch({
        type: detailTypes.DELETE_LIBRARY_BOOK_SUCCESS,
        payload: { data: res.data.data },
      });
    } catch (err) {
      dispatch({ type: detailTypes.LIBRARY_DETAIL_ERROR, payload: err });
    }
  };
};
