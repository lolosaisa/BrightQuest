// src/redux/store.js
import { createStore } from 'redux';
import teacherReducer from './reducers';

const store = createStore(teacherReducer);

const store = configureStore({
    reducer: {
      auth: authReducer,
    },
  });

export default store;