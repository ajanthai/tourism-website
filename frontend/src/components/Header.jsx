import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">

        {/* LEFT — LOGO */}
        <div className="logo-column">
          <img
            src="src/img/logo.jpeg"
            alt="Gravityland Tours Logo"
            className="logo"
          />
        </div>

        {/* RIGHT — CONTENT */}
        <div className="content-column">

          {/* TOP ROW — BRAND */}
          <div className="brand-row">
            <div className="brand-text">
              <span className="brand-name">Gravityland Tours</span>
              <span className="brand-tagline">
                Your pleasure is our value
              </span>
            </div>

            {/* Mobile menu button */}
            <button
              className="menu-btn"
              onClick={() => setOpen(!open)}
            >
              ☰
            </button>
          </div>

          {/* BOTTOM ROW — DESKTOP NAV */}
          <nav className="nav-desktop">
            <Link to="/">Home</Link>
            <Link to="/tours">Tours</Link>
            <Link to="/places">Places</Link>
            <Link to="/how-it-works">How it works</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/login" className="login-btn">Login</Link>
          </nav>

        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="nav-mobile">
          <Link to="/">Home</Link>
          <Link to="/tours">Tours</Link>
          <Link to="/places">Places</Link>
          <Link to="/how-it-works">How it works</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login">Login</Link>
        </div>
      )}
    </header>
  );
}
