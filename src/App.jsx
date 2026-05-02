import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServiciosPage from './pages/ServiciosPage';
import Cart from './pages/Cart';
import ItemDetailContainer from './pages/ItemDetailContainer';
import './App.css';

function App() {
  return (
    <>
      <NavBar />
      <main className="page-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<ServiciosPage />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
