import { useState } from 'react'
import ArticuloContext from './ArticuloContext.js'
import articulosIniciales from '../data/productos.json'
import { validarArticulo } from '../util/validacionesArticulo.js'

function construirArticulosIniciales() {
  return articulosIniciales.map((articulo) => ({ ...articulo }))
}

function ArticuloProvider({ children }) {
  const [articulos, setArticulos] = useState(construirArticulosIniciales)
  const [carrito, setCarrito] = useState([])

  function agregarArticulo(valores) {
    const { esValido, errores, datos } = validarArticulo(valores)

    if (!esValido) {
      return { exito: false, errores }
    }

    const nuevoArticulo = {
      id: crypto.randomUUID(),
      ...datos,
    }

    setArticulos((previos) => [...previos, nuevoArticulo])

    return { exito: true }
  }

  function agregarAlCarrito(articuloId) {
    const articulo = articulos.find(
      (item) => String(item.id) === String(articuloId),
    )
    const entrada = carrito.find(
      (item) => String(item.articuloId) === String(articuloId),
    )

    if (!articulo || articulo.stock <= (entrada?.cantidad ?? 0)) {
      return false
    }

    setCarrito((previos) => {
      const entradaActual = previos.find(
        (item) => String(item.articuloId) === String(articuloId),
      )

      if (entradaActual) {
        return previos.map((item) =>
          String(item.articuloId) === String(articuloId)
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        )
      }

      return [...previos, { articuloId: articulo.id, cantidad: 1 }]
    })

    return true
  }

  function disminuirCantidadCarrito(articuloId) {
    setCarrito((previos) => {
      const entrada = previos.find(
        (item) => String(item.articuloId) === String(articuloId),
      )

      if (!entrada) {
        return previos
      }

      if (entrada.cantidad === 1) {
        return previos.filter(
          (item) => String(item.articuloId) !== String(articuloId),
        )
      }

      return previos.map((item) =>
        String(item.articuloId) === String(articuloId)
          ? { ...item, cantidad: item.cantidad - 1 }
          : item,
      )
    })
  }

  return (
    <ArticuloContext.Provider
      value={{
        articulos,
        agregarArticulo,
        carrito,
        agregarAlCarrito,
        disminuirCantidadCarrito,
      }}
    >
      {children}
    </ArticuloContext.Provider>
  )
}

export default ArticuloProvider
