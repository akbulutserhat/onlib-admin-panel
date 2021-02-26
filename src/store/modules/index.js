import { combineReducers } from 'redux';
import authReducer from './auth/auth.reducer';
import bookReducer from './book/book.reducer';
import libraryReducer from './library/library.reducer';

const reducer = combineReducers({
  Auth: authReducer,
  Book: bookReducer,
  Library: libraryReducer,
});

export default reducer;
