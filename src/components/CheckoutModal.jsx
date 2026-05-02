import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../scss/_checkout-modal.scss';

export default function CheckoutModal({ buyerName, marcas, orderId }) {
  const { clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleGoHome = () => {
    clearCart();
    navigate('/');
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card">
        <div className="modal-header">
          <span className="modal-brand">AR CUSTOMS</span>
        </div>

        <div className="modal-body">
          <div className="modal-checkmark">
            <svg viewBox="0 0 52 52" fill="none">
              <circle cx="26" cy="26" r="25" stroke="currentColor" strokeWidth="2" />
              <path d="M14 26l8 8 16-16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h2>¡Gracias por tu compra!</h2>

          <p className="modal-buyer">
            Hola, <strong>{buyerName}</strong>
          </p>

          <p className="modal-summary">
            Hemos registrado tu pedido para <strong>{marcas}</strong>.
          </p>

          <p className="modal-note">
            Nos pondremos en contacto a la brevedad para coordinar el servicio a domicilio.
          </p>

          {orderId && (
            <div className="modal-order-id">
              <span className="order-id-label">Número de pedido:</span>
              <span className="order-id-value">{orderId}</span>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-modal-home" onClick={handleGoHome}>
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}
