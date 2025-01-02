import React, { useState } from 'react';
import { login, signup } from '../api/auth';

const AuthCard = ({ setUser, setToken, setIsAdmin }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLoginMode) {
        const response = await login({ username: formData.username, password: formData.password });
        setToken(response.data.token);
        setIsAdmin(response.data.isAdmin);
        setUser(formData.username);
      } else {
        await signup(formData);
        alert('Sign-up successful! Please log in.');
        setIsLoginMode(true);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <div className="auth-card">
      <h3>{isLoginMode ? 'Login' : 'Sign Up'}</h3>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        {!isLoginMode && (
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required={!isLoginMode}
          />
        )}
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button className="submit-button" type="submit">{isLoginMode ? 'Login' : 'Sign Up'}</button>
      </form>
      <button className="toggle-mode" onClick={toggleMode}>
        {isLoginMode ? 'Switch to Sign Up' : 'Switch to Login'}
      </button>
    </div>
  );
};

export default AuthCard;
