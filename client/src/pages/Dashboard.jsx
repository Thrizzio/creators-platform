import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from '../utils/auth';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token || isTokenExpired(token)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login', { replace: true });
      return;
    }

    if (!storedUser) {
      navigate('/login', { replace: true });
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
    } catch {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  return (
    <div className="container" style={pageStyle}>
      <h1 style={titleStyle}>Dashboard</h1>
      <p style={subTitleStyle}>You are logged in.</p>

      <div style={cardStyle}>
        <h2 style={cardTitleStyle}>User Info</h2>
        <p><strong>Name:</strong> {user?.name ?? '-'}</p>
        <p><strong>Email:</strong> {user?.email ?? '-'}</p>
      </div>

      <button type="button" onClick={handleLogout} style={buttonStyle}>
        Logout
      </button>
    </div>
  );
};

const pageStyle = {
  padding: '40px 0',
  maxWidth: '680px',
};

const titleStyle = {
  fontSize: '2rem',
  fontWeight: '700',
  marginBottom: '0.5rem',
};

const subTitleStyle = {
  color: 'var(--text-muted)',
  marginBottom: '2rem',
};

const cardStyle = {
  backgroundColor: 'var(--white)',
  padding: '1.5rem',
  borderRadius: '0.75rem',
  border: '1px solid var(--border-color)',
  marginBottom: '1.5rem',
};

const cardTitleStyle = {
  fontSize: '1.125rem',
  fontWeight: '600',
  marginBottom: '1rem',
};

const buttonStyle = {
  backgroundColor: '#b91c1c',
  color: 'var(--white)',
  border: 'none',
  padding: '0.75rem 1.25rem',
  borderRadius: '0.5rem',
  fontWeight: '600',
  cursor: 'pointer',
};

export default Dashboard;
