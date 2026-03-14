const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={footerStyle}>
            <div className="container" style={footerContainerStyle}>
                <p>&copy; {currentYear} CreatorHub. All rights reserved.</p>
                <p>Built for Creators Everywhere.</p>
            </div>
        </footer>
    );
};

const footerStyle = {
    backgroundColor: 'var(--white)',
    borderTop: '1px solid var(--border-color)',
    padding: '2rem 0',
    marginTop: 'auto'
};

const footerContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'var(--text-muted)',
    fontSize: '0.875rem'
};

export default Footer;
