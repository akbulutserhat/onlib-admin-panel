import * as libraryTypes from './library.types';

export const initState = {
  libraries: [],
  successMessage: null,
  isLoading: false,
  libraryError: null,
};

const libraryReducer = (state = initState, action) => {
  switch (action.type) {
    case libraryTypes.GET_LIBRARIES_REQUEST:
    case libraryTypes.ADD_LIBRARY_REQUEST:
    case libraryTypes.UPDATE_LIBRARY_REQUEST:
    case libraryTypes.DELETE_LIBRARY_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case libraryTypes.GET_LIBRARIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        libraries: action.payload.data,
      };
    case libraryTypes.ADD_LIBRARY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        libraries: [...state.libraries, action.payload.data],
        successMessage: action.payload.message,
      };
    case libraryTypes.DELETE_LIBRARY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        libraries: state.libraries.filter(
          (library) => library._id != action.payload.data._id
        ),
        successMessage: action.payload.message,
      };
    case libraryTypes.UPDATE_LIBRARY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        libraries: state.libraries.map((library) =>
          library._id == action.payload.data._id ? action.payload.data : library
        ),
        successMessage: action.payload.message,
      };
    case libraryTypes.LIBRARY_ERROR:
      return {
        ...state,
        isLoading: false,
        libraryError: action.payload.err,
      };
    default:
      return state;
  }
};

export default libraryReducer;
