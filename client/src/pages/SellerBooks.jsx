import { useEffect, useState } from 'react';
import { Container, Table, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getSellerBooks, deleteBook } from '../services/api';
import Loader from '../components/Loader';

const SellerBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const { data } = await getSellerBooks();
      setBooks(data.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
        setBooks(books.filter((book) => book._id !== id));
        alert('Book deleted successfully');
      } catch (error) {
        alert('Failed to delete book');
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="dashboard-bg overlay">
      <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Books</h2>
        <Button as={Link} to="/seller/add-book" variant="success">
          + Add New Book
        </Button>
      </div>

      {books.length === 0 ? (
        <div className="empty-state">
          <h4>No books listed yet</h4>
          <p>Start adding books to your inventory</p>
          <Button as={Link} to="/seller/add-book" variant="primary" className="mt-3">
            Add First Book
          </Button>
        </div>
      ) : (
        <div className="table-custom">
          <Table responsive hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      style={{ width: '50px', height: '70px', objectFit: 'cover' }}
                    />
                  </td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>
                    <Badge bg="info">{book.genre}</Badge>
                  </td>
                  <td>₹{book.price}</td>
                  <td>
                    <Badge bg={book.stock > 0 ? 'success' : 'danger'}>
                      {book.stock}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      as={Link}
                      to={`/seller/edit-book/${book._id}`}
                      variant="warning"
                      size="sm"
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(book._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      </Container>
    </div>
  );
};

export default SellerBooks;