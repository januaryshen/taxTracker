// src/components/LoginForm.js
import React, { useState } from 'react';

function LoginForm({ onLogin }) {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(credentials);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" name="username" value={credentials.username} onChange={handleChange} />
            </label>
            <label>
                Password:
                <input type="password" name="password" value={credentials.password} onChange={handleChange} />
            </label>
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;
