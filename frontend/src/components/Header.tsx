import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

export function Header() {
  const { cart } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header className="main-header">
      <div className="header-container">
        <Link to="/" className="logo">
          Tecprime<span>Store</span>
        </Link>

        <div className="header-actions">
          <Link to="/" className="nav-link">Home</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/my-orders" className="nav-link">Meus Pedidos</Link>
              <button onClick={handleLogout} className="login-btn" style={{ borderColor: '#dc3545', color: '#dc3545' }}>
                Sair
              </button>
            </>
          ) : (
            <Link to="/login" className="login-btn">
              Login
            </Link>
          )}

          <Link to="/cart" className="cart-container">
            <svg xmlns="http://www.w3.org/2000/svg" className="cart-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}