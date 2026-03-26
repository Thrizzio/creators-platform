import { Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

const Header = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const authenticated = isAuthenticated();

    return (
        <header style={headerStyle}>
            <div className="container" style={headerContainerStyle}>
                <div className="logo">
                    <Link to="/" style={logoStyle}>CreatorHub</Link>
                </div>
                <nav>
                    <ul style={navListStyle}>
                        <li><Link to="/" style={linkStyle}>Home</Link></li>
                        {authenticated ? (
                            <>
                                <li><Link to="/dashboard" style={linkStyle}>Dashboard</Link></li>
                                <li style={greetingStyle}>Hi, {user?.name}</li>
                                <li>
                                    <button type="button" onClick={logout} style={logoutButtonStyle}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/login" style={linkStyle}>Login</Link></li>
                                <li><Link to="/register" style={registerButtonStyle}>Register</Link></li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

const headerStyle = {
    backgroundColor: 'var(--white)',
    borderBottom: '1px solid var(--border-color)',
    padding: '1rem 0',
    position: 'sticky',
    top: 0,
    zIndex: 1000
};

const headerContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
};

const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'var(--primary-color)'
};

const navListStyle = {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center'
};

const linkStyle = {
    fontWeight: '500',
    color: 'var(--text-color)'
};

const registerButtonStyle = {
    ...linkStyle,
    backgroundColor: 'var(--primary-color)',
    color: 'var(--white)',
    padding: '0.5rem 1.25rem',
    borderRadius: '0.5rem',
};

const greetingStyle = {
    ...linkStyle,
};

const logoutButtonStyle = {
    ...registerButtonStyle,
    border: 'none',
    cursor: 'pointer',
};

export default Header;
