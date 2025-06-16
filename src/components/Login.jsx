import axios from 'axios';
import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage('Logging in...');
  console.log('Trying to log in with:', { email, password });

  try {
    const apiUrl = `http://localhost:8001/api/auth/login`;
    console.log('API URL:', apiUrl);

    const resp = await axios.post(apiUrl, {
      email,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true // Only if you’re using cookies (optional)
    });

    const data = resp.data;
    console.log('Login successful:', data);

    setMessage('Login successful!');
    setToken(data.token);
    localStorage.setItem('token', data.refresh);
  } catch (error) {
    console.error('Login error:', error);
    if (error.response) {
      // Backend responded with an error status
      const status = error.response.status;
      const msg = error.response.data?.message || 'Login failed';
      setMessage(Error `${status}: ${msg}`);
    } else if (error.message.includes('Network')) {
      setMessage('Network error: Unable to reach backend');
    } else {
      setMessage('Something went wrong. Please try again.');
    }
  }
};

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            background: '#0070f3',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
      </form>

      {message && (
        <p
          style={{
            color: message.includes('successful') ? 'green' : 'red',
            marginTop: '10px',
          }}
        >
          {message}
        </p>
      )}

    </div>
  );
};

export default Login;
