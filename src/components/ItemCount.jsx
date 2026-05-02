import { useState } from 'react';
import '../scss/_item-count.scss';

export default function ItemCount({ onAddToCart }) {
  const [cantidad, setCantidad] = useState(1);

  const handleIncrement = () => {
    setCantidad((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (cantidad > 1) {
      setCantidad((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(cantidad);
    setCantidad(1);
  };

  return (
    <div className="item-count">
      <div className="counter">
        <button className="btn-counter" onClick={handleDecrement}>
          −
        </button>
        <span className="cantidad">{cantidad}</span>
        <button className="btn-counter" onClick={handleIncrement}>
          +
        </button>
      </div>
      <button className="btn-add-cart" onClick={handleAddToCart}>
        Agregar al Carrito
      </button>
    </div>
  );
}
