import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { getBooks, addToCart as addToCartAPI, addToWishlist as addToWishlistAPI } from '../services/api';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    genre: '',
    page: 1,
  });
  const [pagination, setPagination] = useState({});
  const { user } = useAuth();

  const genres = [
    'All',
    'Fiction',
    'Non-Fiction',
    'Mystery',
    'Thriller',
    'Romance',
    'Science Fiction',
    'Fantasy',
    'Biography',
    'History',
    'Self-Help',
    'Business',
    'Children',
    'Horror',
    'Poetry',
  ];

  useEffect(() => {
    fetchBooks();
  }, [filters]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const params = {
        page: filters.page,
        limit: 12,
      };
      
      if (filters.search) params.search = filters.search;
      if (filters.genre && filters.genre !== 'All') params.genre = filters.genre;

      const { data } = await getBooks(params);
      setBooks(data.data);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters({ ...filters, page: 1 });
  };

  const handleGenreChange = (genre) => {
    setFilters({ ...filters, genre, page: 1 });
  };

  const handleAddToCart = async (bookId) => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }
    try {
      await addToCartAPI({ bookId, quantity: 1 });
      alert('Book added to cart!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  const handleAddToWishlist = async (bookId) => {
    if (!user) {
      alert('Please login to add items to wishlist');
      return;
    }
    try {
      await addToWishlistAPI(bookId);
      alert('Book added to wishlist!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add to wishlist');
    }
  };

  if (loading && filters.page === 1) return <Loader />;

  return (
    <div className="books-bg overlay">
      <Container>
      <h2 className="text-center mb-4">Browse Books</h2>

      <div className="filter-section">
        <Row>
          <Col md={6}>
            <Form onSubmit={handleSearch}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Search by title or author..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters({ ...filters, search: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Select
                value={filters.genre}
                onChange={(e) => handleGenreChange(e.target.value)}
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </div>

      {books.length === 0 ? (
        <div className="empty-state">
          <h4>No books found</h4>
          <p>Try different filters or search terms</p>
        </div>
      ) : (
        <>
          <Row>
            {books.map((book) => (
              <Col key={book._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <BookCard
                  book={book}
                  onAddToCart={user?.role === 'user' ? handleAddToCart : null}
                  onAddToWishlist={user?.role === 'user' ? handleAddToWishlist : null}
                />
              </Col>
            ))}
          </Row>

          {pagination.pages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Button
                variant="secondary"
                disabled={filters.page === 1}
                onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                className="me-2"
              >
                Previous
              </Button>
              <span className="mx-3 align-self-center">
                Page {pagination.page} of {pagination.pages}
              </span>
              <Button
                variant="secondary"
                disabled={filters.page === pagination.pages}
                onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                className="ms-2"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
      </Container>
    </div>
  );
};

export default Books;