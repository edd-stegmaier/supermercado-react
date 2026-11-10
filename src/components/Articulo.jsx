import { useState } from 'react'
import { obtenerImagenArticulo } from '../data/imagenesArticulos.js'
import { Link } from 'react-router'
import useArticulos from '../hooks/useArticulos.js'

const formatoPrecio = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
})

function Articulo({ articulo }) {
  const { agregarAlCarrito } = useArticulos()
  const [aviso, setAviso] = useState('')

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
    <article className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 transition-shadow hover:shadow-lg">
      <img
        src={obtenerImagenArticulo(articulo.imagen)}
        alt={articulo.nombre}
        loading="lazy"
        className="h-52 w-full bg-gray-50 object-contain p-4"
      />
      <div className="p-5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-800">
            {articulo.categoria}
          </span>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-black-800"> stock: {articulo.stock}  </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900">
          <Link
            to={`/articulos/${articulo.id}`}
            className="transition-colors hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
          >
            {articulo.nombre}
          </Link>
        </h3>
        <p className="text-sm font-medium text-gray-500">{articulo.marca}</p>
        <p className="mt-2 min-h-10 text-sm text-gray-600">
          {articulo.descripcion}
        </p>
        <p className="mt-4 text-2xl font-bold text-red-700">
          {formatoPrecio.format(articulo.precio)}
        </p>

        <div className="mb-2 flex items-center justify-between gap-2">
        <Link
          to={`/articulos/${articulo.id}`}
          className="mt-4 inline-block rounded-lg border border-red-200 px-4 py-2 font-semibold text-red-800 transition-colors hover:bg-red-50"
        >
          Ver detalle
        </Link>
        <button
          type="button"
          onClick={manejarAgregar}
          disabled={sinStock}
          className="mt-4 w-fit rounded-lg bg-red-700 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-gray-300"
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
        </div>
    </article>
  )
}

export default Articulo
