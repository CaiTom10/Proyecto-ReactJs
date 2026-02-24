import './App.css';
import Card from './components/Card'

function App() {
  return (
    <section>
      <h1>Welcome to React</h1>
      <div className='container-card'>
        <h2 className='title-card'>Estos son nuestros productos</h2>
        <Card 
          title="Ropa 1" 
          img="https://via.placeholder.com/120?text=Ropa+1" 
          price={1200} 
        />
        <Card 
          title="Ropa 2" 
          img="https://via.placeholder.com/120?text=Ropa+2" 
          price={1500} 
        />
        <Card 
          title="Ropa 3" 
          img="https://via.placeholder.com/120?text=Ropa+3" 
          price={1800} 
        />
      </div>
    </section>
  )
}

export default App
