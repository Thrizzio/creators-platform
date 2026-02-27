import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [apiError, setApiError] = useState('');

    const validateForm = () => {
        const newErrors = {};

        if (!name.trim() || name.trim().length < 2 || name.trim().length > 50) {
            newErrors.name = 'Name must be between 2 and 50 characters';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim() || !emailRegex.test(email)) {
            newErrors.email = 'Please enter a valid email format';
        }

        if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError('');
        setSuccessMessage('');

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setApiError(data.message || 'Registration failed');
                setLoading(false);
                return;
            }

            setSuccessMessage(data.message || 'Account created');

            setTimeout(() => {
                navigate('/login');
            }, 1500);

        } catch (error) {
            setApiError('An unexpected error occurred. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="container" style={pageStyle}>
            <div style={formContainerStyle}>
                <h1 style={titleStyle}>Create Account</h1>
                <p style={subTitleStyle}>Join the CreatorHub community today</p>

                {apiError && <div style={errorBannerStyle}>{apiError}</div>}
                {successMessage && <div style={successBannerStyle}>{successMessage}</div>}

                <form style={formStyle} onSubmit={handleSubmit}>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Full Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            style={inputStyle}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <span style={errorTextStyle}>{errors.name}</span>}
                    </div>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Email Address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            style={inputStyle}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <span style={errorTextStyle}>{errors.email}</span>}
                    </div>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            style={inputStyle}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <span style={errorTextStyle}>{errors.password}</span>}
                    </div>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Confirm Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            style={inputStyle}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {errors.confirmPassword && <span style={errorTextStyle}>{errors.confirmPassword}</span>}
                    </div>

                    <button type="submit" style={buttonStyle} disabled={loading}>
                        {loading ? 'Creating Account...' : 'Get Started'}
                    </button>
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

const errorTextStyle = {
    color: '#b91c1c',
    fontSize: '0.75rem',
    marginTop: '0.25rem'
};

const buttonStyle = {
    backgroundColor: 'var(--primary-color)',
    color: 'var(--white)',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    fontWeight: '600',
    fontSize: '1rem',
    marginTop: '0.5rem',
    cursor: 'pointer',
    border: 'none'
};

const footerLinkStyle = {
    marginTop: '1.5rem',
    textAlign: 'center',
    fontSize: '0.875rem',
    color: 'var(--text-muted)'
};

const linkStyle = {
    color: 'var(--primary-color)',
    fontWeight: '600',
    textDecoration: 'none'
};

const errorBannerStyle = {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    marginBottom: '1.25rem',
    fontSize: '0.875rem',
    textAlign: 'center'
};

const successBannerStyle = {
    backgroundColor: '#dcfce3',
    color: '#15803d',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    marginBottom: '1.25rem',
    fontSize: '0.875rem',
    textAlign: 'center'
};

export default Register;
