import * as userTypes from './user.types';

export const initState = {
  users: [],
  count: 0,
  successMessage: null,
  isLoading: false,
  userError: null,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case userTypes.GET_USERS_REQUEST:
    case userTypes.ADD_USER_REQUEST:
    case userTypes.DELETE_USER_REQUEST:
    case userTypes.UPDATE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case userTypes.GET_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload.data,
        count: action.payload.count,
      };
    case userTypes.ADD_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: [...state.users, action.payload.data],
        count: state.count + 1,
        successMessage: action.payload.message,
      };
    case userTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: state.users.filter(
          (user) => user._id != action.payload.data._id
        ),
        count: state.count - 1,
        successMessage: action.payload.message,
      };
    case userTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: state.users.map((user) =>
          user._id == action.payload.data._id ? action.payload.data : user
        ),
        successMessage: action.payload.message,
      };
    case userTypes.USER_ERROR:
      return {
        ...state,
        isLoading: false,
        userError: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
