import { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getSellerStats } from '../services/api';
import Loader from '../components/Loader';

const SellerDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await getSellerStats();
      setStats(data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="dashboard-bg overlay">
      <Container>
      <h2 className="mb-4">Seller Dashboard</h2>
      <Row>
        <Col md={4} className="mb-4">
          <Card className="dashboard-card books">
            <Card.Body>
              <h5>Total Books</h5>
              <h3>{stats.totalBooks}</h3>
              <p>Books listed on platform</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="dashboard-card orders">
            <Card.Body>
              <h5>Total Orders</h5>
              <h3>{stats.totalOrders}</h3>
              <p>Orders received</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="dashboard-card sellers">
            <Card.Body>
              <h5>Total Sales</h5>
              <h3>₹{stats.totalSales}</h3>
              <p>Revenue generated</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </Container>
    </div>
  );
};

export default SellerDashboard;