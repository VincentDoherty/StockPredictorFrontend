import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/register', { username, password });
            if (response.status === 200) {
                navigate('/login');
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            console.error('There was an error registering!', error);
            setError(error.response.data.message || 'There was an error registering!');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Register</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Register;