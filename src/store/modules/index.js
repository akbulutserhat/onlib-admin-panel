import { combineReducers } from 'redux';
import authReducer from './auth/auth.reducer';
import bookReducer from './book/book.reducer';

const reducer = combineReducers({
  Auth: authReducer,
  Book: bookReducer,
});

export default reducer;
