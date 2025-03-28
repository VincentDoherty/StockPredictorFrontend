import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/login', { username, password });
            if (response.status === 200) {
                navigate('/stock');
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('There was an error logging in!', error);
            alert(error.response.data.message || 'There was an error logging in!');
        }
    };

    return (
        <div className="login-container">
            <h1 className="login-title">Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
}

export default Login;