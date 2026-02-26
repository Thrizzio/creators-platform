import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header style={headerStyle}>
            <div className="container" style={headerContainerStyle}>
                <div className="logo">
                    <Link to="/" style={logoStyle}>CreatorHub</Link>
                </div>
                <nav>
                    <ul style={navListStyle}>
                        <li><Link to="/" style={linkStyle}>Home</Link></li>
                        <li><Link to="/login" style={linkStyle}>Login</Link></li>
                        <li><Link to="/register" style={registerButtonStyle}>Register</Link></li>
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

export default Header;
