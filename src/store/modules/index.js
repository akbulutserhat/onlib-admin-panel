import { combineReducers } from 'redux';
import authReducer from './auth/auth.reducer';
import bookReducer from './book/book.reducer';
import libraryReducer from './library/library.reducer';
import libraryDetailReducer from './library/detail/detail.reducer';
import userReducer from './user/user.reducer';

const reducer = combineReducers({
  Auth: authReducer,
  Book: bookReducer,
  Library: libraryReducer,
  LibraryDetail: libraryDetailReducer,
  User: userReducer,
});

export default reducer;
