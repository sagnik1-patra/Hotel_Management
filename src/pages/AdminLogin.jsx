import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ShieldCheck, LogIn } from 'lucide-react';
import './Login.css'; // Reuse existing styling

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { adminLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      adminLogin(username, password);
      navigate('/admin-dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background animate-fade-in" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 60%)' }}></div>
      <div className="glass-panel auth-card animate-fade-in">
        <div className="auth-header">
          <div className="logo-container" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
            <ShieldCheck size={32} color="var(--success-color)" />
          </div>
          <h1>Admin Portal</h1>
          <p>Secure system access</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="input-field"
              placeholder="Admin Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary w-100" style={{ backgroundColor: 'var(--success-color)' }}>
            <LogIn size={20} />
            Access Dashboard
          </button>
        </form>

        <div className="auth-footer">
          <p><Link to="/login">Return to User Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
