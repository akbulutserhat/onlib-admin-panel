import * as bookTypes from './book.types';

export const initState = {
  books: [],
  count: 0,
  successMessage: null,
  isLoading: false,
  bookError: null,
};

const bookReducer = (state = initState, action) => {
  switch (action.type) {
    case bookTypes.GET_BOOKS_REQUEST:
    case bookTypes.ADD_BOOK_REQUEST:
    case bookTypes.DELETE_BOOK_REQUEST:
    case bookTypes.UPDATE_BOOK_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case bookTypes.GET_BOOKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        books: action.payload.data,
        count: action.payload.count,
      };
    case bookTypes.ADD_BOOK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        //books: [...state.books, action.payload.data],
        count: state.count + 1,
        successMessage: action.payload.message,
      };
    case bookTypes.DELETE_BOOK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        books: state.books.filter(
          (book) => book._id != action.payload.data._id
        ),
        count: state.count - 1,
        successMessage: action.payload.message,
      };
    case bookTypes.UPDATE_BOOK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        successMessage: action.payload.message,
      };
    case bookTypes.BOOK_ERROR:
      return {
        ...state,
        isLoading: false,
        bookError: action.payload,
      };
    default:
      return state;
  }
};

export default bookReducer;
