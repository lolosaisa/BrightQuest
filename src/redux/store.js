// src/redux/store.js
import { createStore } from 'redux';
import teacherReducer from './reducer';

const store = createStore(teacherReducer);

export default store;