export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© {new Date().getFullYear()} Gravity Tours. All rights reserved.</p>
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: "40px",
    padding: "16px",
    textAlign: "center",
    background: "#f1f5f9",
  },
};
