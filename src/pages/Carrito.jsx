import { useState } from 'react'
import { Link } from 'react-router'
import { obtenerImagenArticulo } from '../data/imagenesArticulos.js'
import useArticulos from '../hooks/useArticulos.js'

const formatoPrecio = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
})

function Carrito() {
  const {
    articulos,
    carrito,
    agregarAlCarrito,
    disminuirCantidadCarrito,
  } = useArticulos()
  const [aviso, setAviso] = useState('')

  const totalUnidades = carrito.reduce(
    (suma, entrada) => suma + entrada.cantidad,
    0,
  )
  const articuloDe = (articuloId) =>
    articulos.find((articulo) => String(articulo.id) === String(articuloId))
  const totalCompra = carrito.reduce((suma, entrada) => {
    const articulo = articuloDe(entrada.articuloId)
    return suma + (articulo ? articulo.precio * entrada.cantidad : 0)
  }, 0)

  const manejarAumentar = (entrada) => {
    const articulo = articuloDe(entrada.articuloId)
    const agregado = agregarAlCarrito(entrada.articuloId)
    setAviso(
      agregado
        ? `Se aumentó la cantidad de ${articulo?.nombre}.`
        : `No se puede agregar más: alcanzaste el stock de ${articulo?.nombre}.`,
    )
  }

  const manejarDisminuir = (entrada) => {
    const articulo = articuloDe(entrada.articuloId)
    disminuirCantidadCarrito(entrada.articuloId)
    setAviso(
      entrada.cantidad === 1
        ? `${articulo?.nombre} se retiró del carrito.`
        : `Se disminuyó la cantidad de ${articulo?.nombre}.`,
    )
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-12 md:px-6">
      <h1 className="mb-6 text-4xl font-bold text-gray-900">Carrito</h1>
      <p aria-live="polite" role="status" className="mb-4 text-sm text-red-800">
        {aviso}
      </p>

      {carrito.length === 0 ? (
        <div className="rounded-xl bg-white p-6 text-center shadow-sm ring-1 ring-gray-200">
          <p className="mb-5 text-gray-600">
            Tu carrito está vacío. Explora el catálogo y agrega los productos que necesitas.
          </p>
          <Link
            to="/#productos"
            className="inline-block rounded-lg bg-red-700 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-800"
          >
            Ver productos
          </Link>
        </div>
      ) : (
        <>
          <p className="mb-4 text-gray-600">Unidades: {totalUnidades}</p>
          <ul className="flex flex-col gap-4">
            {carrito.map((entrada) => {
              const articulo = articuloDe(entrada.articuloId)

              if (!articulo) {
                return null
              }

              return (
                <li
                  key={entrada.articuloId}
                  className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200"
                >
                  <div className="flex flex-col sm:flex-row">
                    <img
                      src={obtenerImagenArticulo(articulo.imagen)}
                      alt={articulo.nombre}
                      className="h-48 w-full bg-gray-50 object-contain p-4 sm:w-48"
                    />
                    <div className="flex grow flex-col gap-2 p-5">
                      <span className="inline-flex w-fit rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-800">
                        {articulo.categoria}
                      </span>
                      <Link
                        to={`/articulos/${articulo.id}`}
                        className="text-xl font-bold text-gray-900 hover:text-red-700"
                      >
                        {articulo.nombre}
                      </Link>
                      <p className="text-sm text-gray-500">
                        {formatoPrecio.format(articulo.precio)} por unidad
                      </p>
                      <p className="text-sm text-gray-500">
                        Cantidad: {entrada.cantidad} · Stock: {articulo.stock}
                      </p>
                      <div className="mt-auto flex flex-wrap gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => manejarAumentar(entrada)}
                          disabled={entrada.cantidad >= articulo.stock}
                          aria-label={`Aumentar cantidad de ${articulo.nombre}`}
                          className="rounded-lg bg-red-700 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => manejarDisminuir(entrada)}
                          aria-label={`Disminuir cantidad de ${articulo.nombre}`}
                          className="rounded-lg border border-red-200 px-4 py-2 font-semibold text-red-800 transition-colors hover:bg-red-50"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200 sm:flex-row sm:items-center">
            <p className="text-xl font-bold text-gray-900">
              Total: {formatoPrecio.format(totalCompra)}
            </p>
            <Link
              to="/#productos"
              className="rounded-lg border border-red-200 px-4 py-2 font-semibold text-red-800 transition-colors hover:bg-red-50"
            >
              Seguir comprando
            </Link>
          </div>
        </>
      )}
    </section>
  )
}

export default Carrito
