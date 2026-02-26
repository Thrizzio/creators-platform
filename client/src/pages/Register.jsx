import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className="container" style={pageStyle}>
            <div style={formContainerStyle}>
                <h1 style={titleStyle}>Create Account</h1>
                <p style={subTitleStyle}>Join the CreatorHub community today</p>

                <form style={formStyle} onSubmit={(e) => e.preventDefault()}>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Full Name</label>
                        <input type="text" placeholder="John Doe" style={inputStyle} />
                    </div>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Email Address</label>
                        <input type="email" placeholder="you@example.com" style={inputStyle} />
                    </div>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Password</label>
                        <input type="password" placeholder="••••••••" style={inputStyle} />
                    </div>
                    <button type="button" style={buttonStyle}>Get Started</button>
                </form>

                <p style={footerLinkStyle}>
                    Already have an account? <Link to="/login" style={linkStyle}>Login</Link>
                </p>
            </div>
        </div>
    );
};

const pageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '60px 20px'
};

const formContainerStyle = {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: 'var(--white)',
    padding: '2.5rem',
    borderRadius: '1rem',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
};

const titleStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    textAlign: 'center'
};

const subTitleStyle = {
    color: 'var(--text-muted)',
    textAlign: 'center',
    marginBottom: '2rem'
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
};

const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
};

const labelStyle = {
    fontSize: '0.875rem',
    fontWeight: '500'
};

const inputStyle = {
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: '1px solid var(--border-color)',
    fontSize: '1rem'
};

const buttonStyle = {
    backgroundColor: 'var(--primary-color)',
    color: 'var(--white)',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    fontWeight: '600',
    fontSize: '1rem',
    marginTop: '0.5rem'
};

const footerLinkStyle = {
    marginTop: '1.5rem',
    textAlign: 'center',
    fontSize: '0.875rem',
    color: 'var(--text-muted)'
};

const linkStyle = {
    color: 'var(--primary-color)',
    fontWeight: '600'
};

export default Register;
