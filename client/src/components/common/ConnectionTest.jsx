import { useState } from 'react';

const ConnectionTest = () => {
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');

    const testConnection = async () => {
        setStatus('loading');
        setMessage('');

        try {
            // Uses relative URL which is proxied by Vite in dev
            const response = await fetch('/api/health');
            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage(data.message || 'Successfully connected to backend!');
            } else {
                throw new Error(data.message || 'Server responded with an error');
            }
        } catch (err) {
            console.error('Connection Test Error:', err);
            setStatus('error');
            setMessage(err.message || 'Failed to connect to backend. Is the server running?');
        }
    };

    return (
        <div style={containerStyle}>
            <button
                onClick={testConnection}
                disabled={status === 'loading'}
                style={status === 'loading' ? { ...buttonStyle, opacity: 0.7 } : buttonStyle}
            >
                {status === 'loading' ? 'Testing...' : 'Test Backend Connection'}
            </button>

            {status === 'success' && (
                <div style={successStyle}>
                    ✅ {message}
                </div>
            )}

            {status === 'error' && (
                <div style={errorStyle}>
                    ❌ {message}
                </div>
            )}
        </div>
    );
};

const containerStyle = {
    marginTop: '2rem',
    padding: '1.5rem',
    backgroundColor: '#f8fafc',
    borderRadius: '0.75rem',
    border: '1px solid #e2e8f0',
    textAlign: 'center'
};

const buttonStyle = {
    backgroundColor: '#6366f1',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    fontWeight: '600',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
};

const successStyle = {
    marginTop: '1rem',
    color: '#059669',
    fontWeight: '600',
    fontSize: '0.875rem'
};

const errorStyle = {
    marginTop: '1rem',
    color: '#dc2626',
    fontWeight: '600',
    fontSize: '0.875rem'
};

export default ConnectionTest;
