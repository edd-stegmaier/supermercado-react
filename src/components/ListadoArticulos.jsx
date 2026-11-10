import { useId, useState } from 'react'
import Articulo from './Articulo.jsx'
import { CATEGORIAS } from '../data/categoriasArticulos.js'
import useArticulos from '../hooks/useArticulos.js'
import {
  filtrarArticulosPorCategoria,
  VALOR_TODAS,
} from '../util/filtroArticulo.js'

function ListadoArticulos() {
  const { articulos } = useArticulos()
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState(VALOR_TODAS)
  const idFiltro = useId()
  const categoriasDisponibles = [
    ...new Set([...CATEGORIAS, ...articulos.map((articulo) => articulo.categoria)]),
  ]

  const articulosVisibles = filtrarArticulosPorCategoria(
    articulos,
    categoriaSeleccionada,
  )

  const manejarCambioFiltro = (evento) => {
    setCategoriaSeleccionada(evento.target.value)
  }

  return (
    <div>
      <div className="mb-6">
        <label
          htmlFor={idFiltro}
          className="mb-1 block font-semibold text-gray-800"
        >
          Filtrar por categoría
        </label>
        <select
          id={idFiltro}
          value={categoriaSeleccionada}
          onChange={manejarCambioFiltro}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:border-red-600 focus:outline-none sm:w-auto"
        >
          <option value={VALOR_TODAS}>Todas las categorías</option>
          {categoriasDisponibles.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>

      {articulos.length === 0 ? (
        <p className="text-gray-500">Aún no hay productos disponibles.</p>
      ) : articulosVisibles.length === 0 ? (
        <p className="text-gray-500">
          No hay productos en la categoría seleccionada.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {articulosVisibles.map((articulo) => (
            <Articulo key={articulo.id} articulo={articulo} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ListadoArticulos
