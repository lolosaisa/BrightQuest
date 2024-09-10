// src/redux/actions.js
export const ADD_TEACHER = 'ADD_TEACHER';

export const addTeacher = (teacher) => ({
    type: ADD_TEACHER,
    payload: teacher,
});