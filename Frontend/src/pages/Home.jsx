import { Link } from 'react-router-dom';
import heroBg from '../assets/hero_bg.png';
import gallery1 from '../assets/gallery_1.png';
import gallery2 from '../assets/gallery_2.png';
import gallery3 from '../assets/gallery_3.png';

const Home = () => {
  const features = [
    {
      id: 1,
      icon: '🎓',
      title: 'Expert Faculty',
      description: 'Learn from industry experts and experienced professors dedicated to your success.'
    },
    {
      id: 2,
      icon: '💻',
      title: 'Modern Facilities',
      description: 'Access state-of-the-art labs and resources to enhance your learning experience.'
    },
    {
      id: 3,
      icon: '🌍',
      title: 'Global Community',
      description: 'Connect with students from around the world and build a diverse network.'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${heroBg})` }}>
        <div className="container hero-content">
          <h1>Antigravity Devs</h1>
          <p>Excellence in Education, Innovation in Technology.</p>
          <div className="hero-btns">
            <Link to="/form" className="btn btn-primary">Register Now</Link>
            <Link to="/table" className="btn btn-outline">View Students</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Our Key Features</h2>
            <p>What makes us the best choice for your education.</p>
          </div>
          <div className="feature-grid">
            {features.map((feature) => (
              <div key={feature.id} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery">
        <div className="container">
          <div className="section-header">
            <h2>Campus Gallery</h2>
            <p>Explore our vibrant campus life.</p>
          </div>
          <div className="gallery-grid">
            <div className="gallery-item">
              <img src={gallery1} alt="Library" />
            </div>
            <div className="gallery-item">
              <img src={gallery2} alt="Computer Lab" />
            </div>
            <div className="gallery-item">
              <img src={gallery3} alt="Campus" />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta">
        <div className="container cta-content">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join thousands of students and transform your future today.</p>
          <Link to="/form" className="btn btn-primary">Get Started</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
