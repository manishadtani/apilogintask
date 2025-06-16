import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Logging in...');

    try {
      const resp = await fetch('/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!resp.ok) {
        const text = await resp.text();
        let errorMessage = 'Login failed';
        try {
          const data = JSON.parse(text);
          errorMessage = data.message || `Error ${resp.status}: Invalid credentials`;
        } catch {
          if (resp.status === 404) {
            errorMessage = 'API endpoint not found. Please check the backend server configuration.';
          } else {
            errorMessage = `Server error: ${resp.status} ${resp.statusText}`;
          }
        }
        setMessage(errorMessage);
        return;
      }

      const contentType = resp.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        setMessage('Server returned an invalid response format');
        return;
      }

      const data = await resp.json();
      setMessage('Login successful!');
      setToken(data.token);
      localStorage.setItem('token', data.token);
    } catch (error) {
      console.error('Error during login:', error);
      if (error.message.includes('Failed to fetch')) {
        setMessage('Cannot connect to the server. Please check your network or backend availability.');
      } else {
        setMessage('An unexpected error occurred');
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
      <p
        style={{
          color: message.includes('successful') ? 'green' : 'red',
          marginTop: '10px',
        }}
      >
        {message}
      </p>
      {token && (
        <div style={{ marginTop: '20px' }}>
          <h4>Token:</h4>
          <code style={{ wordBreak: 'break-all' }}>{token}</code>
        </div>
      )}
    </div>
  );
};

export default Login;