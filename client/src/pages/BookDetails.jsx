import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { getBook, addToCart as addToCartAPI } from '../services/api';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const { data } = await getBook(id);
      setBook(data.data);
    } catch (error) {
      console.error('Error fetching book:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      alert('Please login to add items to cart');
      navigate('/login');
      return;
    }
    try {
      await addToCartAPI({ bookId: book._id, quantity });
      alert('Book added to cart!');
      navigate('/cart');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  if (loading) return <Loader />;

  if (!book) {
    return (
      <div className="books-bg overlay">
        <Container className="text-center py-5">
          <h3>Book not found</h3>
          <Button onClick={() => navigate('/books')} variant="primary">
            Back to Books
          </Button>
        </Container>
        </div>
    );
  }

  return (
    <div className="books-bg overlay">
      <Container className="fade-in">
      <Button onClick={() => navigate(-1)} variant="secondary" className="mb-4">
        ← Back
      </Button>
      <Row>
        <Col md={4}>
          <img
            src={book.imageUrl}
            alt={book.title}
            className="img-fluid rounded shadow"
            style={{ width: '100%', maxHeight: '600px', objectFit: 'cover' }}
          />
        </Col>
        <Col md={8}>
          <h1 className="mb-3">{book.title}</h1>
          <h5 className="text-muted mb-3">by {book.author}</h5>
          <Badge bg="info" className="mb-3" style={{ fontSize: '1rem' }}>
            {book.genre}
          </Badge>
          <h3 className="text-danger mb-3">₹{book.price}</h3>
          <p className="mb-3">
            <strong>Stock:</strong>{' '}
            {book.stock > 0 ? (
              <span className="text-success">{book.stock} available</span>
            ) : (
              <span className="text-danger">Out of stock</span>
            )}
          </p>
          <p className="mb-3">
            <strong>Rating:</strong> {'⭐'.repeat(Math.round(book.ratings))} (
            {book.ratings})
          </p>
          <p className="mb-3">
            <strong>Seller:</strong> {book.seller?.name || 'N/A'}
          </p>
          <h5>Description:</h5>
          <p style={{ textAlign: 'justify', lineHeight: '1.8' }}>
            {book.description}
          </p>

          {user?.role === 'user' && book.stock > 0 && (
            <div className="mt-4">
              <Row className="align-items-center mb-3">
                <Col xs="auto">
                  <label htmlFor="quantity" className="me-2">
                    Quantity:
                  </label>
                </Col>
                <Col xs="auto">
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    max={book.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="form-control"
                    style={{ width: '80px' }}
                  />
                </Col>
              </Row>
              <Button
                variant="success"
                size="lg"
                onClick={handleAddToCart}
                className="me-2"
              >
                Add to Cart
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/cart')}
              >
                Go to Cart
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default BookDetails;