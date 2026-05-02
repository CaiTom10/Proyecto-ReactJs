import { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { CartContext } from '../context/CartContext';
import ItemDetail from '../components/ItemDetail';

export default function ItemDetailContainer() {
  const { id } = useParams();
  const location = useLocation();
  const { marcaSeleccionada, modeloSeleccionado } = location.state || {};

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useContext(CartContext);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const docRef = doc(db, 'items', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setItem({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError('Servicio no encontrado.');
        }
      } catch (err) {
        setError('Error al cargar el servicio.');
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleAddToCart = (cantidad) => {
    addItem({ ...item, cantidad });
  };

  if (loading) return <div className="item-detail-loading">Cargando servicio...</div>;
  if (error) return <div className="item-detail-loading">{error}</div>;

  return (
    <ItemDetail
      item={item}
      onAddToCart={handleAddToCart}
      marcaSeleccionada={marcaSeleccionada}
      modeloSeleccionado={modeloSeleccionado}
    />
  );
}
