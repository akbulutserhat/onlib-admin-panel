import * as detailTypes from './detail.types';

export const initState = {
  library: null,
  isLoading: false,
  libraryDetailError: null,
};

const libraryDetailReducer = (state = initState, action) => {
  switch (action.type) {
    case detailTypes.GET_LIBRARY_DETAIL_REQUEST:
    case detailTypes.UPDATE_BOOK_STOCK_REQUEST:
    case detailTypes.UPDATE_ORDER_STATUS_REQUEST:
    case detailTypes.ADD_USER_TO_LIBRARY_REQUEST:
    case detailTypes.DELETE_LIBRARY_BOOK_REQUEST:
    case detailTypes.ADD_LIBRARY_BOOK_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case detailTypes.GET_LIBRARY_DETAIL_SUCCESS:
    case detailTypes.UPDATE_BOOK_STOCK_SUCCESS:
    case detailTypes.UPDATE_ORDER_STATUS_SUCCESS:
    case detailTypes.ADD_USER_TO_LIBRARY_SUCCESS:
    case detailTypes.DELETE_LIBRARY_BOOK_SUCCESS:
    case detailTypes.ADD_LIBRARY_BOOK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        library: action.payload.data,
      };
    case detailTypes.LIBRARY_DETAIL_ERROR:
      return {
        ...state,
        isLoading: false,
        libraryDetailError: action.payload.err,
      };
    default:
      return state;
  }
};

export default libraryDetailReducer;
