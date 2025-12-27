import Layout from "./layout/Layout";

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tours from './pages/Tours';
import TourDetail from './pages/TourDetail';
import Contact from './pages/Contact';
import WhatsAppCTA from "./components/WhatsAppCTA";

export default function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/tours"
          element={
            <Layout>
              <Tours />
            </Layout>
          }
        />
        <Route
          path="/tours/:slug"
          element={
            <Layout>
              <TourDetail />
            </Layout>
          }
        />

        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />
      </Routes>
    </>
  );
}
