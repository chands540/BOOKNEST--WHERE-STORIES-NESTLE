import { useEffect, useState } from 'react';
import { Container, Table, Button, Badge } from 'react-bootstrap';
import { getAllSellers, deleteUser } from '../services/api';
import Loader from '../components/Loader';

const AdminSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const { data } = await getAllSellers();
      setSellers(data.data);
    } catch (error) {
      console.error('Error fetching sellers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this seller?')) {
      try {
        await deleteUser(id);
        setSellers(sellers.filter((seller) => seller._id !== id));
        alert('Seller deleted successfully');
      } catch (error) {
        alert('Failed to delete seller');
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="dashboard-bg overlay">
      <Container>
      <h2 className="mb-4">Manage Sellers</h2>
      {sellers.length === 0 ? (
        <div className="empty-state">
          <h4>No sellers found</h4>
          <p>Sellers will appear here once registered</p>
        </div>
      ) : (
        <div className="table-custom">
          <Table responsive hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller) => (
                <tr key={seller._id}>
                  <td>{seller.name}</td>
                  <td>{seller.email}</td>
                  <td>
                    <Badge bg="info">{seller.role}</Badge>
                  </td>
                  <td>{new Date(seller.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(seller._id)}
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

export default AdminSellers;