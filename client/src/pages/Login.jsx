import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading: authLoading, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && isAuthenticated()) {
      navigate('/dashboard', { replace: true });
    }
  }, [authLoading, isAuthenticated, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'email') {
      setEmail(value);
    }

    if (name === 'password') {
      setPassword(value);
    }
  };

  const validateForm = () => {
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required');
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // For protected endpoints, send: Authorization: Bearer <token>
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
        setLoading(false);
        return;
      }

      login(data.user, data.token);
      navigate('/dashboard', { replace: true });
    } catch {
      setError('Unable to connect to the server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={pageStyle}>
      <div style={formContainerStyle}>
        <h1 style={titleStyle}>Login</h1>
        <p style={subTitleStyle}>Welcome back to CreatorHub</p>

        {error ? <div style={errorBannerStyle}>{error}</div> : null}

        <form style={formStyle} onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label htmlFor="email" style={labelStyle}>Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              style={inputStyle}
              value={email}
              onChange={handleChange}
            />
          </div>
          <div style={inputGroupStyle}>
            <label htmlFor="password" style={labelStyle}>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              style={inputStyle}
              value={password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p style={footerLinkStyle}>
          Don&apos;t have an account? <Link to="/register" style={linkStyle}>Register</Link>
        </p>
      </div>
    </div>
  );
};

const pageStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '60px 20px',
};

const formContainerStyle = {
  width: '100%',
  maxWidth: '400px',
  backgroundColor: 'var(--white)',
  padding: '2.5rem',
  borderRadius: '1rem',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
};

const titleStyle = {
  fontSize: '2rem',
  fontWeight: '700',
  marginBottom: '0.5rem',
  textAlign: 'center',
};

const subTitleStyle = {
  color: 'var(--text-muted)',
  textAlign: 'center',
  marginBottom: '2rem',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
};

const inputGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
};

const labelStyle = {
  fontSize: '0.875rem',
  fontWeight: '500',
};

const inputStyle = {
  padding: '0.75rem',
  borderRadius: '0.5rem',
  border: '1px solid var(--border-color)',
  fontSize: '1rem',
};

const buttonStyle = {
  backgroundColor: 'var(--primary-color)',
  color: 'var(--white)',
  padding: '0.75rem',
  borderRadius: '0.5rem',
  fontWeight: '600',
  fontSize: '1rem',
  marginTop: '0.5rem',
  border: 'none',
  cursor: 'pointer',
};

const footerLinkStyle = {
  marginTop: '1.5rem',
  textAlign: 'center',
  fontSize: '0.875rem',
  color: 'var(--text-muted)',
};

const linkStyle = {
  color: 'var(--primary-color)',
  fontWeight: '600',
};

const errorBannerStyle = {
  backgroundColor: '#fee2e2',
  color: '#b91c1c',
  padding: '0.75rem',
  borderRadius: '0.5rem',
  marginBottom: '1rem',
  fontSize: '0.875rem',
  textAlign: 'center',
};

export default Login;
