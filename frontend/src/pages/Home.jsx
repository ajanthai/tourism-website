import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Gravity Tours Sri Lanka</h1>
      <nav>
        <Link to="/tours">Tours</Link> |{' '}
        <Link to="/contact">Contact</Link>
      </nav>
    </div>
  );
}
