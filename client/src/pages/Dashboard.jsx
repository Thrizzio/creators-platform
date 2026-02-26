const Dashboard = () => {
    return (
        <div className="container" style={pageStyle}>
            <h1 style={titleStyle}>Welcome to your Dashboard</h1>
            <p style={subTitleStyle}>Manage your content and track your performance.</p>

            <div style={gridStyle}>
                <div style={cardStyle}>
                    <h2 style={cardTitleStyle}>Your Posts</h2>
                    <div style={placeholderBoxStyle}>List of recent posts will appear here...</div>
                </div>
                <div style={cardStyle}>
                    <h2 style={cardTitleStyle}>Create New Content</h2>
                    <button style={actionButtonStyle}>+ New Post</button>
                </div>
                <div style={cardStyle}>
                    <h2 style={cardTitleStyle}>Analytics Overview</h2>
                    <div style={placeholderBoxStyle}>Charts and stats will appear here...</div>
                </div>
            </div>
        </div>
    );
};

const pageStyle = {
    padding: '40px 0'
};

const titleStyle = {
    fontSize: '2.25rem',
    fontWeight: '700',
    marginBottom: '0.5rem'
};

const subTitleStyle = {
    color: 'var(--text-muted)',
    marginBottom: '2.5rem'
};

const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem'
};

const cardStyle = {
    backgroundColor: 'var(--white)',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    border: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
};

const cardTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: '600'
};

const placeholderBoxStyle = {
    backgroundColor: '#f1f5f9',
    padding: '2rem',
    borderRadius: '0.5rem',
    border: '2px dashed var(--border-color)',
    color: 'var(--text-muted)',
    textAlign: 'center',
    fontSize: '0.875rem'
};

const actionButtonStyle = {
    backgroundColor: 'var(--primary-color)',
    color: 'var(--white)',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    fontWeight: '600',
    width: '100%'
};

export default Dashboard;
