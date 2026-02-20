import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BookCard = ({ book, onAddToCart, onAddToWishlist, showActions = true }) => {
  return (
    <Card className="book-card">
      <Card.Img variant="top" src={book.imageUrl} alt={book.title} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>
          <small className="text-muted">by {book.author}</small>
        </Card.Text>
        <Card.Text>
          <span className="badge bg-info">{book.genre}</span>
        </Card.Text>
        <p className="book-rating">⭐ {book.ratings || 0} / 5</p>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="book-price">₹{book.price}</span>
          <span className="text-muted">
            {book.stock > 0 ? `${book.stock} in stock` : 'Out of stock'}
          </span>
        </div>
        {showActions && (
          <div className="d-grid gap-2">
            <Button
              as={Link}
              to={`/books/${book._id}`}
              variant="primary"
              className="btn-primary-custom"
            >
              View Details
            </Button>
            {onAddToCart && (
              <Button
                variant="success"
                onClick={() => onAddToCart(book._id)}
                disabled={book.stock === 0}
              >
                Add to Cart
              </Button>
            )}
            {onAddToWishlist && (
              <Button
                variant="outline-danger"
                onClick={() => onAddToWishlist(book._id)}
              >
                ❤ Wishlist
              </Button>
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default BookCard;