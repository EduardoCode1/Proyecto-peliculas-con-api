// frontend/src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      history.push('/add-movie'); // Redirige al usuario a la página '/add-movie'
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/auth/register', { username, password });
      alert('Usuario registrado exitosamente');
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión / Registrarse</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar Sesión</button>
        <button type="button" onClick={handleRegister}>Registrarse</button>
      </form>
    </div>
  );
};

export default Login;
