const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="logo-text">SVA^2</div>
        <p className="footer-tagline">Empowering the next generation of tech leaders.</p>
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#privacy">Privacy</a>
          <a href="#contact">Contact</a>
        </div>
        <p className="footer-copy">&copy; {currentYear} SVA^2 Devs. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
