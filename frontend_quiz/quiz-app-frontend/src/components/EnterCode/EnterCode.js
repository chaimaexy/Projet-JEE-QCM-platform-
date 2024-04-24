import React, { useState } from 'react';
import './EnterCode.css';
import axios from 'axios';
import api from '../../api/axiosConfig';

const EnterCode = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [examId, setExamId] = useState(localStorage.getItem('examId')); // Initialize examId from local storage

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/api/v1/validate_code', code);
            console.log('Exam ID:', response.data);
            const examId = response.data;
            setExamId(examId);
            localStorage.setItem('examId', examId); // Store examId in local storage
        
            window.location = '/instructions';
        } catch (error) {
            setError('Invalid code. Please try again.');
            console.error('Error:', error);
        }
    };

    const handleChange = (event) => {
        setCode(event.target.value);
        setError('');
    };

    return (
        <div className='enter-code'>
            <form onSubmit={handleSubmit}>
                <h2>Enter Quiz Code</h2>
                <p>the Quiz Code should be given by the creator</p>
                <br/>
                
                <input type='text' value={code} onChange={handleChange} placeholder='Enter code' />
                <br/>
                <br/>
                <button className='submit-button' type='submit'>Submit</button>
            </form>
            {error && <p className='error'>{error}</p>}
           
        </div>
    );
};

export default EnterCode;
