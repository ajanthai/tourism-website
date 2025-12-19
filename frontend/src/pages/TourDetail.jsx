import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { setSEO } from "../utils/seo";

export default function TourDetail() {
  const { slug } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  // SEO — runs once
  useEffect(() => {
    setSEO({
      title: "Sri Lanka Tour Packages | Gravity Tours",
      description:
        "Explore curated Sri Lanka tour packages including beaches, wildlife safaris, cultural heritage, and adventure tours.",
    });
  }, []);
  
  useEffect(() => {
    fetch(`/api/tours/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setTour(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  // update document title and meta description when we have tour data
  useEffect(() => {
    if (!tour) return;
    try {
      document.title = `${tour.title} | Gravity Tours`;
      const desc = tour.description ? tour.description.slice(0, 150) : '';
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', desc);
    } catch {
      // ignore in environments without DOM
    }
  }, [tour]);

  if (loading) return <p>Loading tour...</p>;
  if (!tour) return <p>Tour not found</p>;

  return (
    <div>
      <Link to="/tours">← Back to tours</Link>

      {tour.image_url && (
        <img
          src={tour.image_url}
          alt={tour.title || 'Tour image'}
          style={{
            width: '100%',
            maxHeight: '400px',
            objectFit: 'cover',
            borderRadius: '12px'
          }}
        />
      )}

      <h1>{tour.title}</h1>
      <p><strong>Location:</strong> {tour.location}</p>
      <p><strong>Duration:</strong> {tour.duration}</p>
      <p><strong>Price:</strong> ${tour.price}</p>

      <p>{tour.description}</p>

      <Link to="/contact">Enquire Now</Link>
    </div>
  );
}
