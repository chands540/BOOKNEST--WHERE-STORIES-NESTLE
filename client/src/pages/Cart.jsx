import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  getCart,
  updateCartItem,
  removeFromCart as removeFromCartAPI,
  createOrder,
} from '../services/api';
import Loader from '../components/Loader';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: 'India',
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const { data } = await getCart();
      setCart(data.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (bookId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateCartItem(bookId, { quantity: newQuantity });
      fetchCart();
    } catch (error) {
      alert('Failed to update quantity');
    }
  };

  const handleRemove = async (bookId) => {
    try {
      await removeFromCartAPI(bookId);
      fetchCart();
    } catch (error) {
      alert('Failed to remove item');
    }
  };

  const calculateTotal = () => {
    if (!cart || !cart.books) return 0;
    return cart.books.reduce(
      (total, item) => total + item.book.price * item.quantity,
      0
    );
  };

  const handleCheckout = async () => {
    try {
      const orderData = {
        books: cart.books.map((item) => ({
          book: item.book._id,
          quantity: item.quantity,
        })),
        shippingAddress,
      };

      await createOrder(orderData);
      alert('Order placed successfully!');
      setShowCheckout(false);
      navigate('/orders');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to place order');
    }
  };

  if (loading) return <Loader />;

  if (!cart || cart.books.length === 0) {
    return (
      <div className="books-bg overlay">
        <Container>
          <div className="empty-state">
            <h3>Your cart is empty</h3>
            <p>Start shopping to add items to your cart</p>
            <Button variant="primary" className="btn-primary-custom" onClick={() => navigate('/books')}>
              Browse Books
            </Button>
          </div>
        </Container>
        </div>
    );
  }

  return (
    <div className="books-bg overlay">
      <Container>
      <h2 className="mb-4">Shopping Cart</h2>
      <Row>
        <Col md={8}>
          {cart.books.map((item) => (
            <div key={item.book._id} className="cart-item">
              <Row className="align-items-center">
                <Col xs={3} md={2}>
                  <img
                    src={item.book.imageUrl}
                    alt={item.book.title}
                    className="img-fluid rounded"
                  />
                </Col>
                <Col xs={9} md={10}>
                  <Row>
                    <Col md={6}>
                      <h5>{item.book.title}</h5>
                      <p className="text-muted">{item.book.author}</p>
                      <p className="text-danger fw-bold">₹{item.book.price}</p>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                          type="number"
                          min="1"
                          max={item.book.stock}
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.book._id,
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3} className="text-end">
                      <p className="fw-bold">
                        ₹{item.book.price * item.quantity}
                      </p>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemove(item.book._id)}
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          ))}
        </Col>
        <Col md={4}>
          <Card className="shadow">
            <Card.Body>
              <h4>Order Summary</h4>
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>Items ({cart.books.length}):</span>
                <span>₹{calculateTotal()}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong className="text-danger">₹{calculateTotal()}</strong>
              </div>
              <Button
                variant="success"
                className="w-100"
                size="lg"
                onClick={() => setShowCheckout(true)}
              >
                Proceed to Checkout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Checkout Modal */}
      <Modal show={showCheckout} onHide={() => setShowCheckout(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Shipping Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={shippingAddress.address}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, address: e.target.value })
                }
                required
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    value={shippingAddress.city}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, city: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    type="text"
                    value={shippingAddress.postalCode}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        postalCode: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                value={shippingAddress.country}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, country: e.target.value })
                }
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCheckout(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleCheckout}>
            Place Order (₹{calculateTotal()})
          </Button>
        </Modal.Footer>
      </Modal>
      </Container>
    </div>
  );
};

export default Cart;