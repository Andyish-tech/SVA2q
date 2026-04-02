const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-info">
          <h3>Antigravity Devs</h3>
          <p>Empowering the next generation of tech leaders.</p>
        </div>
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#privacy">Privacy</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} Antigravity Devs. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
