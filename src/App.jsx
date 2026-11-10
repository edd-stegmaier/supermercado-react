import { Routes, Route } from 'react-router'
import ArticuloProvider from './context/ArticuloProvider.jsx'
import Navegacion from './components/Navegacion.jsx'
import PiePagina from './components/PiePagina.jsx'
import Inicio from './pages/Inicio.jsx'
import NuevoArticulo from './pages/NuevoArticulo.jsx'
import QuienesSomos from './pages/QuienesSomos.jsx'
import NuestrasTiendas from './pages/NuestrasTiendas.jsx'
import DetalleArticulo from './pages/DetalleArticulo.jsx'
import Carrito from './pages/Carrito.jsx'

function App() {
  return (
    <ArticuloProvider>
      <div className="flex min-h-screen flex-col">
        <Navegacion />

        <main className="grow">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/articulos/:id" element={<DetalleArticulo />} />
            <Route path="/articulos/nuevo" element={<NuevoArticulo />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
            <Route path="/nuestras-tiendas" element={<NuestrasTiendas />} />
          </Routes>
        </main>

        <PiePagina />
      </div>
    </ArticuloProvider>
  )
}

export default App
