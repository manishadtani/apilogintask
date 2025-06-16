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
     
   const apiUrl = `${import.meta.env.VITE_API_URL}/auth/login`;
      const resp = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!resp.ok) {
        const text = await resp.text();
        console.warn('Error response:', text);

        let errorMessage = 'Login failed';
        try {
          const data = JSON.parse(text);
          errorMessage = data.message || `Error ${resp.status}: Invalid credentials`;
        } catch {
          if (resp.status === 404) {
            errorMessage = 'API endpoint not found. Is the backend running?';
          } else {
            errorMessage = `Server error: ${resp.status} ${resp.statusText}`;
          }
        }
        setMessage(errorMessage);
        return;
      }

      const contentType = resp.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        setMessage('Server returned unexpected format');
        return;
      }

      const data = await resp.json();
      console.log('Login successful:', data);

      setMessage('Login successful!');
      setToken(data.token);
      localStorage.setItem('token', data.refresh);
    } catch (error) {
      console.error('Network or unknown error:', error);
      if (error.message.includes('Failed to fetch')) {
        setMessage('Can’t connect, error in handleSubmit.');
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
