export const VALOR_TODAS = 'todas'

export function filtrarArticulosPorCategoria(articulos, categoriaSeleccionada) {
  if (categoriaSeleccionada === VALOR_TODAS) {
    return articulos
  }

  return articulos.filter(
    (articulo) => articulo.categoria === categoriaSeleccionada,
  )
}
