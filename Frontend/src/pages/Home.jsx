import { Link } from 'react-router-dom';
import heroBg from '../assets/hero_bg.png';
import gallery1 from '../assets/gallery_1.png';
import gallery2 from '../assets/gallery_2.png';
import gallery3 from '../assets/gallery_3.png';

const Home = () => {
  const features = [
    {
      id: 1,
      icon: '📚',
      title: 'Rich Curriculum',
      description: 'Access hundreds of courses across all disciplines.'
    },
    {
      id: 2,
      icon: '🎯',
      title: 'Track Progress',
      description: 'Monitor student performance with real-time analytics.'
    },
    {
      id: 3,
      icon: '🌍',
      title: 'Learn Anywhere',
      description: 'Fully responsive — study from any device, any time.'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <img src={heroBg} alt="Hero" className="hero-img" />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Welcome to SVA^2</h1>
          <p className="hero-subtitle">The modern platform for student registration and management.</p>
          <div className="hero-actions">
            <Link to="/form" className="btn btn-primary">Register Now</Link>
            <Link to="/table" className="btn btn-outline">View Students</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Why SVA^2?</h2>
        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature.id} className="feature-card">
              <span className="feature-icon">{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery">
        <h2 className="section-title">TEAM</h2>
        <div className="gallery-grid">
          <img src={gallery1} alt="Library" />
          <img src={gallery2} alt="Computer Lab" />
          <img src={gallery3} alt="Campus" />
          <img src={gallery2} alt="Computer Lab" />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta">
        <div className="cta-inner">
          <h2>Ready to get started?</h2>
          <p>Join thousands of students already using SVA^2.</p>
          <Link to="/form" className="btn btn-primary">Register a Student</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
