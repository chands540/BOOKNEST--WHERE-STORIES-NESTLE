import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { getProfile, removeFromWishlist as removeFromWishlistAPI } from '../services/api';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const { data } = await getProfile();
      setWishlist(data.data.wishlist);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (bookId) => {
    try {
      await removeFromWishlistAPI(bookId);
      setWishlist(wishlist.filter((book) => book._id !== bookId));
      alert('Removed from wishlist');
    } catch (error) {
      alert('Failed to remove from wishlist');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="books-bg overlay">
      <Container>
      <h2 className="mb-4">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <div className="empty-state">
          <h4>Your wishlist is empty</h4>
          <p>Add books you love to your wishlist</p>
        </div>
      ) : (
        <Row>
          {wishlist.map((book) => (
            <Col key={book._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <BookCard book={book} showActions={false} />
              <Button
                variant="danger"
                className="w-100 mt-2"
                onClick={() => handleRemove(book._id)}
              >
                Remove from Wishlist
              </Button>
            </Col>
          ))}
        </Row>
      )}
      </Container>
    </div>
  );
};

export default Wishlist;