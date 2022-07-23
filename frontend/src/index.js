import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from "react-redux";
import ReduxThunk from 'redux-thunk'
import { combineReducers, createStore, applyMiddleware } from "redux";
import { BrowserRouter } from 'react-router-dom';
import App from './App';


import adminReducer from './redux/reducers/admin-reducers';
import loadingReducer from './redux/reducers/loading-reducer';
import userReducer from './redux/reducers/user-reducers';
import cartReducer from './redux/reducers/cart-reducers';
import orderReducer from './redux/reducers/order-reducers';
import categoryReducer from './redux/reducers/category-reducers';

const Reducer = combineReducers({
  admin: adminReducer,
  loading: loadingReducer,
  users: userReducer,
  cart: cartReducer,
  order: orderReducer,
  category: categoryReducer
})

//create global store
const store = createStore(Reducer, applyMiddleware(ReduxThunk))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
