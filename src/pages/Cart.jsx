import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { CartContext } from '../context/CartContext';
import CheckoutModal from '../components/CheckoutModal';
import '../scss/_cart.scss';

const EMPTY_FORM = { nombre: '', telefono: '', email: '', emailConfirm: '' };
const EMPTY_ERRORS = { nombre: '', telefono: '', email: '', emailConfirm: '' };

export default function Cart() {
  const { cartItems, removeItem, actualizarCantidad, clearCart, getTotalPrice } = useContext(CartContext);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState(EMPTY_ERRORS);
  const [orderData, setOrderData] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const totalPrice = getTotalPrice();
  const uniqueMarcas = [...new Set(cartItems.map((i) => `${i.marca} ${i.modelo}`))].join(', ');

  const validate = () => {
    const next = { ...EMPTY_ERRORS };
    let valid = true;

    if (!form.nombre.trim()) {
      next.nombre = 'El nombre es obligatorio.';
      valid = false;
    }
    if (!form.telefono.trim()) {
      next.telefono = 'El teléfono es obligatorio.';
      valid = false;
    } else if (!/^\+?[\d\s\-()]{7,}$/.test(form.telefono.trim())) {
      next.telefono = 'Ingresá un número de teléfono válido.';
      valid = false;
    }
    if (!form.email.trim()) {
      next.email = 'El email es obligatorio.';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Ingresá un email válido.';
      valid = false;
    }
    if (!form.emailConfirm.trim()) {
      next.emailConfirm = 'Confirmá tu email.';
      valid = false;
    } else if (form.email.trim() !== form.emailConfirm.trim()) {
      next.emailConfirm = 'Los emails no coinciden.';
      valid = false;
    }

    setErrors(next);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const order = {
        buyer: {
          nombre: form.nombre.trim(),
          telefono: form.telefono.trim(),
          email: form.email.trim(),
        },
        items: cartItems.map(({ id, nombre, marca, modelo, precio, cantidad }) => ({
          id, nombre, marca, modelo, precio, cantidad,
        })),
        total: totalPrice,
        date: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, 'orders'), order);
      setOrderData({ orderId: docRef.id, buyerName: form.nombre.trim(), marcas: uniqueMarcas });
    } catch {
      setErrors((prev) => ({ ...prev, nombre: 'Error al procesar la orden. Intentá nuevamente.' }));
    } finally {
      setSubmitting(false);
    }
  };

  if (cartItems.length === 0 && !orderData) {
    return (
      <main className="cart-main">
        <div className="cart-container">
          <h1>Mi Carrito</h1>
          <div className="empty-cart">
            <p>Tu carrito está vacío</p>
            <Link to="/servicios" className="btn-continue-shopping">Ver Servicios</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      {orderData && (
        <CheckoutModal
          buyerName={orderData.buyerName}
          marcas={orderData.marcas}
          orderId={orderData.orderId}
        />
      )}

      <main className="cart-main">
        <div className="cart-container">
          <h1>Mi Carrito</h1>

          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-details">
                  <h3>{item.nombre}</h3>
                  <p className="item-marca">{item.marca} — {item.modelo}</p>
                  <p className="item-price">${item.precio}</p>
                </div>
                <div className="item-quantity">
                  <button
                    className="btn-qty"
                    onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                    disabled={item.cantidad <= 1}
                    aria-label="Reducir cantidad"
                  >−</button>
                  <span className="qty-value">{item.cantidad}</span>
                  <button
                    className="btn-qty"
                    onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                    disabled={item.stock != null && item.cantidad >= item.stock}
                    aria-label="Aumentar cantidad"
                  >+</button>
                </div>
                <div className="item-subtotal">
                  <p className="subtotal-label">Subtotal:</p>
                  <p className="subtotal-price">${item.precio * item.cantidad}</p>
                </div>
                <button className="btn-remove" onClick={() => removeItem(item.id)}>
                  Eliminar
                </button>
              </div>
            ))}
          </div>

          <div className="cart-total-bar">
            <span className="total-label">Total a Pagar:</span>
            <span className="total-amount">${totalPrice}</span>
          </div>

          <form className="checkout-form" onSubmit={handleSubmit} noValidate>
            <h2 className="checkout-title">Datos del Comprador</h2>

            <div className="form-row">
              <div className={`form-group ${errors.nombre ? 'has-error' : ''}`}>
                <label htmlFor="nombre">Nombre completo</label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="Ej: Juan García"
                  value={form.nombre}
                  onChange={handleChange}
                />
                {errors.nombre && <span className="field-error">{errors.nombre}</span>}
              </div>

              <div className={`form-group ${errors.telefono ? 'has-error' : ''}`}>
                <label htmlFor="telefono">Teléfono</label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  placeholder="Ej: +54 11 1234-5678"
                  value={form.telefono}
                  onChange={handleChange}
                />
                {errors.telefono && <span className="field-error">{errors.telefono}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              <div className={`form-group ${errors.emailConfirm ? 'has-error' : ''}`}>
                <label htmlFor="emailConfirm">Confirmar Email</label>
                <input
                  id="emailConfirm"
                  name="emailConfirm"
                  type="email"
                  placeholder="Repetí tu email"
                  value={form.emailConfirm}
                  onChange={handleChange}
                />
                {errors.emailConfirm && <span className="field-error">{errors.emailConfirm}</span>}
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-checkout" disabled={submitting}>
                {submitting ? 'Procesando...' : 'Finalizar Compra'}
              </button>
              <button type="button" className="btn-clear-cart" onClick={clearCart} disabled={submitting}>
                Vaciar Carrito
              </button>
              <Link to="/servicios" className="btn-continue">
                Continuar Comprando
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
