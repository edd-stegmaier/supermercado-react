import { useContext } from 'react'
import ArticuloContext from '../context/ArticuloContext.js'

function useArticulos() {
  const contexto = useContext(ArticuloContext)

  if (!contexto) {
    throw new Error('useArticulos debe utilizarse dentro de un ArticuloProvider.')
  }

  return contexto
}

export default useArticulos
