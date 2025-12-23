import Layout from "./layout/Layout";

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tours from './pages/Tours';
import TourDetail from './pages/TourDetail';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/AdminLogin';
import AdminTours from './pages/admin/AdminTours';

export default function App() {
  return (
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
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/tours" element={<AdminTours />} />

    </Routes>
  );
}
