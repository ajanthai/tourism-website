import WhatsAppCTA from "./WhatsAppCTA";
export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© {new Date().getFullYear()} Gravityland Tours
                                      info@gravitylandtours.com
                                      Sri Lanka
                                      All rights reserved. <WhatsAppCTA variant="inline" /></p>
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
