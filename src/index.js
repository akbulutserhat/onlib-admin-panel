import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Routes from './routes';
import { Provider } from "react-redux"
import reportWebVitals from './reportWebVitals';
import store from './store/index'
import setAuthorizationToken  from './helpers/authorization';
import { LOGIN_SUCCESS } from './store/modules/auth/auth.types';

//when the page reloads, the auth user is still set
if (localStorage.token){
  setAuthorizationToken(localStorage.token) 
  let userData = localStorage.getItem('user_data') == null ? null : JSON.parse(localStorage.getItem('user_data'))
  store.dispatch({ type: LOGIN_SUCCESS, payload: userData}) //provided he has a valid token 
}

ReactDOM.render(<Provider store={store}><Routes /></Provider>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
