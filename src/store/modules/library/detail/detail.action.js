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
        `${LIBRARY_API_ROUTE}/${libraryId}/${bookId}`,
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
