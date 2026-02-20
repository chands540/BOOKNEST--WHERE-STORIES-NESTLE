import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getBooks } from '../services/api';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const { data } = await getBooks({ limit: 6 });
      setBooks(data.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="home-bg overlay">
      <div className="hero-section">
        <Container>
          <h1>Welcome to BookNest</h1>
          <p>Where Stories Nestle - Discover Your Next Favorite Read</p>
          <Button
            as={Link}
            to="/books"
            variant="light"
            size="lg"
            className="mt-3"
          >
            Browse Books
          </Button>
        </Container>
      </div>

      <Container>
        <h2 className="text-center mb-4 text-white">Featured Books</h2>
        <Row>
          {books.map((book) => (
            <Col key={book._id} xs={12} sm={6} md={4} className="mb-4">
              <BookCard book={book} showActions={true} />
            </Col>
          ))}
        </Row>
        <div className="text-center mt-4">
          <Button as={Link} to="/books" variant="primary" size="lg">
            View All Books
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Home;