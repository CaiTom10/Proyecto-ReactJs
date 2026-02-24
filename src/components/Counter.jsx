import { useState } from "react";

export default function Counter() {
    const [cantidad, setCantidad] = useState(1);

    function restar() {
        setCantidad(cantidad > 1 ? cantidad - 1 : 1);
    }

    function sumar() {
        setCantidad(cantidad + 1);
    }

    return (
        <div style={{marginBottom: '12px'}}>
            <button onClick={restar}>-</button>
            <span className="counter-number">{cantidad}</span>
            <button onClick={sumar}>+</button>
        </div>
    );
}