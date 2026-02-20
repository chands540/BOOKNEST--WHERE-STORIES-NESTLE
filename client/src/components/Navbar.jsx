import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BSNavbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <BSNavbar expand="lg" className="navbar-custom">
      <Container>
        <BSNavbar.Brand as={Link} to="/">
          📚 BookNest
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="nav-link-custom">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/books" className="nav-link-custom">
              Books
            </Nav.Link>

            {user ? (
              <>
                {user.role === 'user' && (
                  <>
                    <Nav.Link as={Link} to="/cart" className="nav-link-custom">
                      Cart
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/wishlist"
                      className="nav-link-custom"
                    >
                      Wishlist
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/orders"
                      className="nav-link-custom"
                    >
                      Orders
                    </Nav.Link>
                  </>
                )}

                {user.role === 'seller' && (
                  <NavDropdown
                    title="Seller"
                    id="seller-dropdown"
                    className="nav-link-custom"
                  >
                    <NavDropdown.Item as={Link} to="/seller/dashboard">
                      Dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/seller/books">
                      My Books
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/seller/add-book">
                      Add Book
                    </NavDropdown.Item>
                  </NavDropdown>
                )}

                {user.role === 'admin' && (
                  <NavDropdown
                    title="Admin"
                    id="admin-dropdown"
                    className="nav-link-custom"
                  >
                    <NavDropdown.Item as={Link} to="/admin/dashboard">
                      Dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/users">
                      Users
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/sellers">
                      Sellers
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/orders">
                      Orders
                    </NavDropdown.Item>
                  </NavDropdown>
                )}

                <NavDropdown
                  title={user.name}
                  id="user-dropdown"
                  className="nav-link-custom"
                >
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="nav-link-custom">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="nav-link-custom">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;