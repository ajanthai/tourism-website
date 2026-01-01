import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { supabase } from "../lib/supabaseClient";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user ?? null);
    };

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const userName = user?.user_metadata?.name || "User";
  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <header className="site-header">
      <div className="header-inner">

        {/* LEFT — LOGO */}
        <div className="logo-column">
          <img
            src="/images/logo-primary.jpeg"
            alt="Gravityland Tours Logo"
            className="logo"
          />
        </div>

        {/* RIGHT — CONTENT */}
        <div className="content-column">

          {/* TOP ROW */}
          <div className="brand-row">

            {/* BRAND */}
            <div className="brand-text">
              <span className="brand-name">Gravityland Tours</span>
              <span className="brand-tagline">
                <em>Your pleasure is our value</em>
              </span>
            </div>

            {/* DESKTOP USER PANEL */}
            <div className="user-panel-desktop">
              {!user ? null : (
                <>
                  {avatarUrl && (
                    <img
                      src={avatarUrl}
                      alt="Profile"
                      className="avatar"
                    />
                  )}
                  <span className="user-name">{userName}</span>
                </>
              )}
            </div>

            {/* MOBILE MENU BUTTON */}
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
            {!user ? (
                <Link onClick={handleLogin}>
                  Login
                </Link>
              ) : (
                <Link onClick={handleLogout}>
                  Logout
                </Link>
              )}
          </nav>
        </div>
      </div>

      {/* MOBILE MENU (UNCHANGED) */}
      {open && (
        <div className="nav-mobile">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/tours" onClick={() => setOpen(false)}>Tours</Link>
          <Link to="/places" onClick={() => setOpen(false)}>Places</Link>
          <Link to="/how-it-works" onClick={() => setOpen(false)}>How it works</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>

          {!user ? (
            <Link onClick={handleLogin}>
              Login
            </Link>
          ) : (
            <Link onClick={handleLogout}>
              Logout
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
