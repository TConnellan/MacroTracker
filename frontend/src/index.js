import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import App from './App';
//import reportWebVitals from './reportWebVitals';



import consumedReducer from "./reducers/consumedReducer"
import recipeReducer from "./reducers/recipeReducer"
import userReducer from "./reducers/userReducer"

const store = configureStore({
    reducer: {
        user: userReducer,
        consumed: consumedReducer,
        recipes: recipeReducer
    }
})


ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
