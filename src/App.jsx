
import './App.css'

function App() {
let titulo = "Bienvenidos a mi App con React y Vite";
  return (
    <>
      <h1>{titulo}</h1>
      <div className="card">
        <button>
          Presioname
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
