import { Link, NavLink } from 'react-router'
import useArticulos from '../hooks/useArticulos.js'

function Navegacion() {
  const { carrito } = useArticulos()
  const totalUnidades = carrito.reduce(
    (suma, entrada) => suma + entrada.cantidad,
    0,
  )

  return (
    <header className="border-b border-red-100 bg-white shadow-sm">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6">
        <Link
          to="/"
          className="py-1 text-xl font-bold tracking-tight text-red-700"
        >
          Supermercado
        </Link>

        <nav aria-label="Menú principal">
          <ul className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive
                    ? 'rounded-md bg-red-50 px-4 py-2 font-semibold text-red-800'
                    : 'rounded-md px-4 py-2 font-medium text-gray-600 transition-colors hover:bg-red-50 hover:text-red-800'
                }
              >
                Inicio
              </NavLink>
            </li>
            <li>
              <Link
                to="/#productos"
                className="rounded-md px-4 py-2 font-medium text-gray-600 transition-colors hover:bg-red-50 hover:text-red-800"
              >
                Productos
              </Link>
            </li>
            <li>
              <NavLink
                to="/quienes-somos"
                className={({ isActive }) =>
                  isActive
                    ? 'rounded-md bg-red-50 px-4 py-2 font-semibold text-red-800'
                    : 'rounded-md px-4 py-2 font-medium text-gray-600 transition-colors hover:bg-red-50 hover:text-red-800'
                }
              >
                Quiénes somos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/nuestras-tiendas"
                className={({ isActive }) =>
                  isActive
                    ? 'rounded-md bg-red-50 px-4 py-2 font-semibold text-red-800'
                    : 'rounded-md px-4 py-2 font-medium text-gray-600 transition-colors hover:bg-red-50 hover:text-red-800'
                }
              >
                Tiendas
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/carrito"
                className={({ isActive }) =>
                  isActive
                    ? 'rounded-md bg-red-50 px-4 py-2 font-semibold text-red-800'
                    : 'rounded-md px-4 py-2 font-medium text-gray-600 transition-colors hover:bg-red-50 hover:text-red-800'
                }
              >
                Carrito{totalUnidades > 0 ? ` (${totalUnidades})` : ''}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/articulos/nuevo"
                className={({ isActive }) =>
                  isActive
                    ? 'rounded-md bg-red-50 px-4 py-2 font-semibold text-red-800'
                    : 'rounded-md px-4 py-2 font-medium text-gray-600 transition-colors hover:bg-red-50 hover:text-red-800'
                }
              >
                Agregar producto
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navegacion
