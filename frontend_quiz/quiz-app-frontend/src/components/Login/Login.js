import React, { useState } from 'react';
import './Login.css';
import { Link, useHistory } from 'react-router-dom'; // Import useHistory
import api from '../../api/axiosConfig';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [userId, setUserId] = useState(null);

    const handleLogin = async () => {
        
        if (!username || !password) {
                setError('Username and password are required.');
                return;
            }
    
        try {
            const response = await api.post('/api/v1/login', { username, password });
            const userId = response.data;
            console.log('User ID:', userId);
            
            
            localStorage.setItem('userId', userId);
            
            
            setUserId(userId);
            
            
            setError('');

            
            window.location = '/'; 
        } catch (error) {
            setError('Invalid username or password. Please try again.');
            console.error('Error:', error);
        }
    };

    return (
        <div className='login'>
            <form>
                <h2>Login</h2>
                <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                <button onClick={handleLogin}>Login</button>
                <p>Don't have an account? <Link to="/createAccount">Create one</Link></p>
           
                
            </form>
            {error && <p className='error'>{error}</p>}
            {userId && <p>User ID: {userId}</p>}
        </div>
    );
};

export default Login;