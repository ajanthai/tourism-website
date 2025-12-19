import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { setSEO } from "../utils/seo";

export default function Tours() {
  const [tours, setTours] = useState([]);
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
    fetch('/api/tours')
      .then(res => res.json())
      .then(data => {
        setTours(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading tours...</p>;

  return (
    <div>
      <h1>Our Tours</h1>

      {tours.map(tour => (
        <div key={tour.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <h2>{tour.title}</h2>
          <p>{tour.description}</p>
          <Link to={`/tours/${tour.slug}`}>View Details</Link>
          {tour.image_url && (
            <img
              src={tour.image_url}
              alt={tour.title || 'Tour image'}
              style={{
                width: '100%',
                maxHeight: '200px',
                objectFit: 'cover',
                borderRadius: '8px'
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
