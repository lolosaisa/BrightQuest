// src/components/Signup.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTeacher } from '../redux/actions';

const Signup = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const teacher = { name, email, subject };
        dispatch(addTeacher(teacher));
        setName('');
        setEmail('');
        setSubject('');
        alert('Teacher signed up successfully!');
    };

    return (
        <div>
            <h2>Teacher Signup</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Subject:</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;