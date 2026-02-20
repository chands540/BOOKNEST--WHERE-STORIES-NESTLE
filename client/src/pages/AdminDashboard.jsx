import { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getAdminStats } from '../services/api';
import Loader from '../components/Loader';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await getAdminStats();
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
      <h2 className="mb-4">Admin Dashboard</h2>
      <Row>
        <Col md={3} className="mb-4">
          <Card className="dashboard-card users">
            <Card.Body>
              <h5>Total Users</h5>
              <h3>{stats.totalUsers}</h3>
              <p>Registered users</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="dashboard-card sellers">
            <Card.Body>
              <h5>Total Sellers</h5>
              <h3>{stats.totalSellers}</h3>
              <p>Active sellers</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="dashboard-card books">
            <Card.Body>
              <h5>Total Books</h5>
              <h3>{stats.totalBooks}</h3>
              <p>Books in catalog</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="dashboard-card orders">
            <Card.Body>
              <h5>Total Orders</h5>
              <h3>{stats.totalOrders}</h3>
              <p>Orders placed</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Card className="shadow">
            <Card.Body>
              <h4>Revenue Overview</h4>
              <hr />
              <h2 className="text-success">₹{stats.totalRevenue}</h2>
              <p className="text-muted">Total revenue generated</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard;