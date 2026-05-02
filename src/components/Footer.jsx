import '../scss/_footer.scss';

function Footer() {
  return (
    <footer>
      <h2>Derechos reservados de AR CUSTOMS</h2>
      <h2>Hecho por Tomi</h2>
      <nav>
        <ul>
          <li>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img
                src="/img/Instagram_icon.webp"
                alt="Logo de Instagram"
                className="logos"
              />
            </a>
          </li>
          <li>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <img
                src="/img/logotipo-x.jpg"
                alt="Logo de x"
                className="logos"
              />
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <img
                src="/img/Youtube_logo.webp"
                alt="Logo de Youtube"
                className="logos"
              />
            </a>
          </li>
          <li>
            <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
              <img
                src="/img/WhatsApp.logo.webp"
                alt="Logo de WhatsApp"
                className="logo-whatsapp"
              />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
