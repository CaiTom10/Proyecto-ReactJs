import { useState, useEffect, useContext } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Link, useLocation } from 'react-router-dom';
import { db } from '../firebase/config';
import ItemCount from './ItemCount';
import { CartContext } from '../context/CartContext';
import '../scss/_servicios.scss';

export default function Servicios() {
  const location = useLocation();
  const estadoInicial = location.state || {};

  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState(estadoInicial.marcaSeleccionada || '');
  const [modeloSeleccionado, setModeloSeleccionado] = useState(estadoInicial.modeloSeleccionado || '');
  const { addItem } = useContext(CartContext);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'items'));
        const raw = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        console.log('[Servicios] items recibidos de Firebase:', raw);

        const items = raw.filter((item) => {
          const valid =
            typeof item.marca === 'string' && item.marca.trim() !== '' &&
            typeof item.modelo === 'string' && item.modelo.trim() !== '' &&
            typeof item.nombre === 'string' && item.nombre.trim() !== '' &&
            (typeof item.precio === 'number' || typeof item.precio === 'string');

          if (!valid) {
            console.warn('[Servicios] Documento descartado por campos faltantes o inválidos:', item);
          }
          return valid;
        });

        if (items.length === 0 && raw.length > 0) {
          console.warn('[Servicios] Ningún documento pasó la validación. Revisá los campos en Firestore.');
        }

        setAllItems(items);
      } catch (err) {
        console.error('[Servicios] Error al obtener items de Firebase:', err);
        setError('No se pudieron cargar los servicios. Intentá más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const marcas = [...new Set(allItems.map((i) => i.marca))].sort();
  const modelos = marcaSeleccionada
    ? [...new Set(allItems.filter((i) => i.marca === marcaSeleccionada).map((i) => i.modelo))].sort()
    : [];
  const servicios = marcaSeleccionada && modeloSeleccionado
    ? allItems.filter((i) => i.marca === marcaSeleccionada && i.modelo === modeloSeleccionado)
    : [];

  const handleMarcaChange = (e) => {
    setMarcaSeleccionada(e.target.value);
    setModeloSeleccionado('');
  };

  const handleModeloChange = (e) => {
    setModeloSeleccionado(e.target.value);
  };

  const handleAddToCart = (servicio, cantidad) => {
    addItem({ ...servicio, cantidad, marca: marcaSeleccionada, modelo: modeloSeleccionado });
  };

  if (loading) {
    return (
      <section className="servicios-selector">
        <div className="servicios-placeholder">
          <p>Cargando servicios...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="servicios-selector">
        <div className="servicios-placeholder servicios-error">
          <p>{error}</p>
        </div>
      </section>
    );
  }

  if (!loading && allItems.length === 0) {
    return (
      <section className="servicios-selector">
        <div className="servicios-placeholder">
          <p>No hay servicios disponibles en este momento.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="servicios-selector">
      <div className="selector-container">
        <div className="selector-group">
          <label htmlFor="marca">Selecciona tu Marca:</label>
          <select
            id="marca"
            value={marcaSeleccionada}
            onChange={handleMarcaChange}
            className="selector-input"
          >
            <option value="">-- Elige una marca --</option>
            {marcas.map((marca) => (
              <option key={marca} value={marca}>{marca}</option>
            ))}
          </select>
        </div>

        {marcaSeleccionada && (
          <div className="selector-group">
            <label htmlFor="modelo">Selecciona tu Modelo:</label>
            <select
              id="modelo"
              value={modeloSeleccionado}
              onChange={handleModeloChange}
              className="selector-input"
            >
              <option value="">-- Elige un modelo --</option>
              {modelos.map((modelo) => (
                <option key={modelo} value={modelo}>{modelo}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {servicios.length > 0 && (
        <div className="servicios">
          {servicios.map((servicio) => (
            <article
              key={servicio.id}
              className="servicios-items"
              style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.70), rgba(0,0,0,0.82)), url(${servicio.img})` }}
            >
              <h2>{servicio.nombre}</h2>
              <div className="servicio-precio">
                <p className="precio">${servicio.precio}</p>
              </div>
              <p className="marca-modelo">{marcaSeleccionada} {modeloSeleccionado}</p>
              <Link
                to={`/item/${servicio.id}`}
                state={{ marcaSeleccionada: servicio.marca, modeloSeleccionado: servicio.modelo }}
                className="btn-ver-detalles"
              >
                Ver Detalles
              </Link>
            </article>
          ))}
        </div>
      )}

      {!marcaSeleccionada && (
        <div className="servicios-placeholder">
          <p>Selecciona una marca y modelo para ver los servicios disponibles</p>
        </div>
      )}

      {marcaSeleccionada && modeloSeleccionado && servicios.length === 0 && (
        <div className="servicios-placeholder">
          <p>No hay servicios disponibles para este modelo.</p>
        </div>
      )}
    </section>
  );
}
