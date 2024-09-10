// src/redux/store.js
import { createStore } from 'redux';
import authReducer from './auth/authSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = createStore(teacherReducer);

const store = configureStore({
    reducer: {
      auth: authReducer,
    },
  });

export default store;