import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main style={{ minHeight: "80vh", padding: "24px" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
