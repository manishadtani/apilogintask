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
      console.log(apiUrl);

      const resp = await axios.post(apiUrl, {
        email,
        password,
      });

      // Axios doesn't have `.ok`, it throws error automatically on bad response (like 400/401)
      const data = resp.data;
      console.log('Login successful:', data);

      setMessage('Login successful!');
      setToken(data.token);
      localStorage.setItem('token', data.refresh); // assuming 'refresh' is your refresh token
    } catch (error) {
      console.error('Login error:', error);

      if (error.response) {
        // Server responded with a status other than 2xx
        if (error.response.status === 404) {
          setMessage('API endpoint not found. Is the backend running?');
        } else {
          setMessage(error.response.data.message || 'Login failed');
        }
      } else if (error.request) {
        // Request made but no response
        setMessage('No response from server. Please check connection.');
      } else {
        // Other errors
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
