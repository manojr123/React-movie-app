import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createStore, applyMiddleware} from 'redux';
import App from './components/App';
import rootReducer from './reducers';

// function logger(obj, next, action)
// logger(obj)(next)(action) ...internally
// const logger = function ({dispatch, getState}) {
//   return function(next) {
//     return function(action) {
//       //middleware code
//       console.log('ACTION_TYPE = ', action.type);
//       next(action);
//     }
//   }

// }

const logger = ({dispatch, getState}) => (next) => (action) => {
      //middleware code
      if ( typeof action !== 'function') {
        console.log('ACTION_TYPE = ', action.type);
      }
      next(action);
      
}


const thunk =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action === "function") {
      action(dispatch);
      return;
    }
    next(action);
  };


  const store = createStore(rootReducer, applyMiddleware(logger, thunk));
  console.log('store', store);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App store={store}/>
  </React.StrictMode>
);

