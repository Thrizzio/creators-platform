import { Link } from 'react-router-dom';
import ConnectionTest from '../components/common/ConnectionTest';

const Home = () => {
    return (
        <div className="home-page">
            <section style={heroSectionStyle}>
                <div className="container">
                    <h1 style={heroTitleStyle}>Welcome to CreatorHub</h1>
                    <p style={heroSubTitleStyle}>The ultimate platform for modern creators to build, share, and monetize their content.</p>
                    <Link to="/register" style={ctaButtonStyle}>Get Started Now</Link>

                    <div style={{ maxWidth: '400px', margin: '2rem auto 0' }}>
                        <ConnectionTest />
                    </div>
                </div>
            </section>

            <section style={featureSectionStyle}>
                <div className="container">
                    <div style={gridStyle}>
                        <div style={featureCardStyle}>
                            <h3>Build Your Brand</h3>
                            <p>Create a stunning profile and showcase your work to the world with our intuitive tools.</p>
                        </div>
                        <div style={featureCardStyle}>
                            <h3>Engage Fans</h3>
                            <p>Connect with your audience through powerful networking and community building features.</p>
                        </div>
                        <div style={featureCardStyle}>
                            <h3>Unlock Analytics</h3>
                            <p>Deep dive into your performance with real-time data insights and growth metrics.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const heroSectionStyle = {
    padding: '80px 0',
    textAlign: 'center',
    backgroundColor: '#f1f5f9'
};

const heroTitleStyle = {
    fontSize: '3.5rem',
    marginBottom: '1.5rem',
    fontWeight: '800',
    color: '#0f172a'
};

const heroSubTitleStyle = {
    fontSize: '1.25rem',
    color: 'var(--text-muted)',
    maxWidth: '600px',
    margin: '0 auto 2.5rem'
};

const ctaButtonStyle = {
    backgroundColor: 'var(--primary-color)',
    color: 'var(--white)',
    padding: '1rem 2rem',
    borderRadius: '0.75rem',
    fontSize: '1.125rem',
    fontWeight: '600',
    display: 'inline-block'
};

const featureSectionStyle = {
    padding: '80px 0'
};

const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem'
};

const featureCardStyle = {
    padding: '2.5rem',
    backgroundColor: 'var(--white)',
    borderRadius: '1rem',
    border: '1px solid var(--border-color)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'default'
};

export default Home;
