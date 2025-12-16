import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Tours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

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
        </div>
      ))}
    </div>
  );
}
