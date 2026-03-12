import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container" style={pageStyle}>
            <h1 style={titleStyle}>404</h1>
            <h2 style={subTitleStyle}>Page Not Found</h2>
            <p style={descStyle}>Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" style={buttonStyle}>Back to Home</Link>
        </div>
    );
};

const pageStyle = {
    textAlign: 'center',
    padding: '100px 20px'
};

const titleStyle = {
    fontSize: '6rem',
    fontWeight: '800',
    color: 'var(--primary-color)',
    lineHeight: '1'
};

const subTitleStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '1rem'
};

const descStyle = {
    color: 'var(--text-muted)',
    marginBottom: '2.5rem'
};

const buttonStyle = {
    backgroundColor: 'var(--primary-color)',
    color: 'var(--white)',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    fontWeight: '600',
    display: 'inline-block'
};

export default NotFound;
