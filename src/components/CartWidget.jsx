import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../scss/_cart-widget.scss';

export default function CartWidget() {
  const { getTotalItems } = useContext(CartContext);
  const totalItems = getTotalItems();

  return (
    <Link to="/cart" className="cart-widget">
      <svg
        className="cart-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
    </Link>
  );
}
