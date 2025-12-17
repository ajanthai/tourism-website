import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header style={styles.header}>
      <h2 style={styles.logo}>Gravity Tours</h2>
      <nav>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/tours" style={styles.link}>Tours</Link>
        <Link to="/contact" style={styles.link}>Contact</Link>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px 32px",
    background: "#0f172a",
    color: "white",
  },
  logo: {
    margin: 0,
  },
  link: {
    marginLeft: "16px",
    color: "white",
    textDecoration: "none",
  },
};
