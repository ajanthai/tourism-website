import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function TourDetail() {
  const { slug } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Loading tour...</p>;
  if (!tour) return <p>Tour not found</p>;

  return (
    <div>
      <Link to="/tours">← Back to tours</Link>

      <h1>{tour.title}</h1>
      <p><strong>Location:</strong> {tour.location}</p>
      <p><strong>Duration:</strong> {tour.duration}</p>
      <p><strong>Price:</strong> ${tour.price}</p>

      <p>{tour.description}</p>

      <Link to="/contact">Enquire Now</Link>
    </div>
  );
}
