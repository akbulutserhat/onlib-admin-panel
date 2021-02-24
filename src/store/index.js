import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from './modules/index'
import { composeWithDevTools } from 'redux-devtools-extension';

// FOR LOCAL BUILD
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//   reducer,  
//   composeEnhancers(
//     applyMiddleware(thunk)
//   )
// );

// FOR PRODUCTION BUILD
const store = createStore(
    reducer,  
      composeWithDevTools(applyMiddleware(thunk))
  );

export default store;