import { useEffect, useState } from 'react';
import { Container, Card, Badge, Row, Col } from 'react-bootstrap';
import { getUserOrders } from '../services/api';
import Loader from '../components/Loader';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await getUserOrders();
      setOrders(data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      processing: 'info',
      shipped: 'primary',
      delivered: 'success',
      cancelled: 'danger',
    };
    return <Badge bg={variants[status] || 'secondary'}>{status.toUpperCase()}</Badge>;
  };

  if (loading) return <Loader />;

  return (
    <div className="books-bg overlay">
      <Container>
      <h2 className="mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <div className="empty-state">
          <h4>No orders yet</h4>
          <p>Start shopping to see your orders here</p>
        </div>
      ) : (
        orders.map((order) => (
          <Card key={order._id} className="mb-3 shadow-sm">
            <Card.Body>
              <Row>
                <Col md={8}>
                  <h5>Order #{order._id.slice(-8)}</h5>
                  <p className="text-muted mb-2">
                    Placed on: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="mb-2">
                    Status: {getStatusBadge(order.status)}
                  </p>
                  <p className="mb-2">
                    <strong>Shipping Address:</strong> {order.shippingAddress.address},{' '}
                    {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                  </p>
                  <h6 className="mt-3">Items:</h6>
                  {order.books.map((item) => (
                    <div key={item._id} className="mb-2">
                      <Row>
                        <Col xs={2}>
                          <img
                            src={item.book.imageUrl}
                            alt={item.book.title}
                            className="img-fluid rounded"
                          />
                        </Col>
                        <Col xs={10}>
                          <p className="mb-0">
                            <strong>{item.book.title}</strong>
                          </p>
                          <p className="text-muted mb-0">
                            Quantity: {item.quantity} × ₹{item.price}
                          </p>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </Col>
                <Col md={4} className="text-end">
                  <h4 className="text-danger">₹{order.totalAmount}</h4>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
    </div>
  );
};

export default Orders;