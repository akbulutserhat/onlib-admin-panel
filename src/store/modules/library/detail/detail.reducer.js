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
      return {
        ...state,
        isLoading: true,
      };
    case detailTypes.GET_LIBRARY_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        library: action.payload.data,
      };
    case detailTypes.UPDATE_BOOK_STOCK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        library: action.payload.data,
      };
    default:
      return state;
  }
};

export default libraryDetailReducer;
