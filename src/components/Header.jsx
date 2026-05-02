import { Link } from 'react-router-dom';
import '../scss/_header.scss';

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg header-menu">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img
              src="/img/Aguila-logo.webp"
              alt="Logo Aguila"
              title="Logo Aguila"
              className="header-logo"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <h1>AR CUSTOMS</h1>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Galería</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/servicios">Servicios</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">Sobre Nosotros</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">Contacto</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
