import React, { useState } from 'react';
import './CreateAccount.css'; 
import api from '../../api/axiosConfig'; 

const CreateAccount = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Validate if any field is empty
        if (!username || !email || !password) {
            setError('All fields are required.');
            return;
        }

        try {
            const response = await api.post('/api/v1/register', { username, email, password });
            console.log('User created:', response.data);
            setSuccessMessage('Account created successfully!');
            // Clear error message
            setError('');
            // Optionally, redirect the user to another page after successful account creation
        } catch (error) {
            setError('An error occurred while creating your account. Please try again.');
            console.error('Error:', error);
        }
    };

    return (
        <div className='create-account container'>
            <form onSubmit={handleSubmit}>
                <h2>Create Account</h2>
                <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                <br/>
                <br/>
                <button type='submit'>Create Account</button>
           
            {error && <p className='error'>{error}</p>}
            {successMessage && <p className='success'>{successMessage}</p>}
            </form>
        </div>
    );
};

export default CreateAccount;
