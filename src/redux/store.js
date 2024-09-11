// src/redux/store.js
import { createStore } from 'redux';
import teacherReducer from './reducers';

const store = createStore(teacherReducer);

export default store;