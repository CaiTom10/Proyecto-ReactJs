import { useNavigate } from 'react-router-dom';
import ItemCount from './ItemCount';
import '../scss/_item-detail.scss';

export default function ItemDetail({ item, onAddToCart, marcaSeleccionada, modeloSeleccionado }) {
  const navigate = useNavigate();
  const marca = marcaSeleccionada || item.marca || '';
  const modelo = modeloSeleccionado || item.modelo || '';

  const handleVolver = () => {
    navigate('/servicios', {
      state: { marcaSeleccionada: marca, modeloSeleccionado: modelo },
    });
  };

  const textoVolver = marca && modelo ? `← Volver a ${marca} ${modelo}` : '← Volver a servicios';

  return (
    <section className="item-detail-wrapper">
      <div className="item-detail-card">
        <div className="item-detail-image-col">
          <img src={item.img} alt={item.nombre} className="item-detail-image" />
        </div>

        <div className="item-detail-info-col">
          {item.categoria && <p className="item-detail-categoria">{item.categoria}</p>}
          <h1 className="item-detail-nombre">{item.nombre}</h1>
          <p className="item-detail-marca-modelo">
            {marca} &mdash; {modelo}
          </p>

          {item.description && (
            <p className="item-detail-description">{item.description}</p>
          )}

          <div className="item-detail-precio-block">
            <span className="item-detail-precio">${item.precio?.toLocaleString('es-AR')}</span>
          </div>

          <div className="item-detail-count">
            <ItemCount onAddToCart={onAddToCart} />
          </div>

          <button onClick={handleVolver} className="item-detail-back">
            {textoVolver}
          </button>
        </div>
      </div>
    </section>
  );
}
