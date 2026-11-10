import { useState } from 'react'
import { Link, useParams } from 'react-router'
import useArticulos from '../hooks/useArticulos.js'
import { obtenerImagenArticulo } from '../data/imagenesArticulos.js'

const formatoPrecio = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
})

function DetalleArticulo() {
  const { id } = useParams()
  const { articulos, agregarAlCarrito } = useArticulos()
  const [aviso, setAviso] = useState('')
  const articulo = articulos.find((item) => String(item.id) === String(id))

  if (!articulo) {
    return (
      <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
        <div className="mx-auto max-w-xl rounded-xl bg-white p-6 text-center shadow-sm ring-1 ring-gray-200">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Producto no encontrado
          </h1>
          <p className="mb-5 text-gray-600">
            El producto que buscas no existe o ya no está disponible.
          </p>
          <Link
            to="/"
            className="inline-block rounded-lg bg-red-700 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-800"
          >
            Volver al catálogo
          </Link>
        </div>
      </section>
    )
  }

  const sinStock = articulo.stock === 0

  const manejarAgregar = () => {
    const agregado = agregarAlCarrito(articulo.id)
    setAviso(
      agregado
        ? `${articulo.nombre} se agregó al carrito.`
        : 'No es posible agregar más unidades: alcanzaste el stock disponible.',
    )
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-12 md:px-6">
      <div className="mb-6 flex flex-wrap gap-3">
        <Link
          to="/"
          className="rounded-lg border border-red-200 px-4 py-2 font-semibold text-red-800 transition-colors hover:bg-red-50"
        >
          Volver al catálogo
        </Link>
        <Link
          to="/carrito"
          className="rounded-lg bg-red-700 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-800"
        >
          Ir al carrito
        </Link>
      </div>

      <article className="grid overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 md:grid-cols-2">
        <div className="flex min-h-72 items-center justify-center bg-gray-50 p-8">
          <img
            src={obtenerImagenArticulo(articulo.imagen)}
            alt={articulo.nombre}
            className="max-h-96 w-full object-contain"
          />
        </div>
        <div className="flex flex-col p-6 md:p-8">
          <span className="mb-3 inline-flex w-fit rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-800">
            {articulo.categoria}
          </span>
          <h1 className="mb-1 text-3xl font-bold text-gray-900">
            {articulo.nombre}
          </h1>
          <p className="mb-4 text-gray-500">{articulo.marca}</p>
          <p className="mb-5 text-gray-600">{articulo.descripcion}</p>
          <p className="mb-2 text-3xl font-bold text-red-700">
            {formatoPrecio.format(articulo.precio)}
          </p>
          <p className="mb-6 text-sm text-gray-500">
            {sinStock ? 'Sin stock disponible' : `Stock disponible: ${articulo.stock}`}
          </p>
          <button
            type="button"
            onClick={manejarAgregar}
            disabled={sinStock}
            className="w-fit rounded-lg bg-red-700 px-5 py-3 font-semibold text-white transition-colors hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Agregar al carrito
          </button>
          {sinStock && (
            <p className="mt-2 text-sm text-gray-500">
              Este producto no tiene stock por el momento.
            </p>
          )}
          <p aria-live="polite" role="status" className="mt-4 text-sm text-red-800">
            {aviso}
          </p>
        </div>
      </article>
    </section>
  )
}

export default DetalleArticulo
