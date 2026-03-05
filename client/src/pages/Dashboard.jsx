import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="container" style={pageStyle}>
      <h1 style={titleStyle}>Dashboard</h1>
      <p style={subTitleStyle}>You are logged in.</p>

      <div style={cardStyle}>
        <h2 style={cardTitleStyle}>User Info</h2>
        <p><strong>Name:</strong> {user?.name ?? '-'}</p>
        <p><strong>Email:</strong> {user?.email ?? '-'}</p>
      </div>

      <button type="button" onClick={logout} style={buttonStyle}>
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
