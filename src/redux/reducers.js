// src/redux/reducer.js
import { ADD_TEACHER } from './actions';

const initialState = {
    teachers: JSON.parse(sessionStorage.getItem('teachers')) || [],
};

const teacherReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TEACHER:
            const updatedTeachers = [...state.teachers, action.payload];
            sessionStorage.setItem('teachers', JSON.stringify(updatedTeachers));
            return {
                ...state,
                teachers: updatedTeachers,
            };
        default:
            return state;
    }
};

export default teacherReducer;