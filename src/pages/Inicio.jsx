import { Link } from 'react-router'
import ListadoArticulos from '../components/ListadoArticulos.jsx'
import { obtenerImagenArticulo } from '../data/imagenesArticulos.js'

const imagenesOferta = Object.entries(
  import.meta.glob('../data/ofertas/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
  }),
)
  .sort(([primera], [segunda]) => primera.localeCompare(segunda))
  .map(([ruta, src]) => ({
    src,
    nombre: ruta
      .split('/')
      .at(-1)
      .replace(/\.[^.]+$/, '')
      .replace(/[_-]+/g, ' '),
  }))

function Inicio() {
  return (
    <>
      <section className="bg-gradient-to-br from-red-50 via-white to-white">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-2 md:px-6 lg:py-24">
          <div>
            <p className="mb-3 font-semibold uppercase tracking-wide text-red-700">
              Todo para tu hogar, en un solo lugar
            </p>
            <h1 className="mb-5 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Tu supermercado de todos los días
            </h1>
            <p className="mb-7 max-w-xl text-lg text-gray-600">
              Encuentra alimentos y productos esenciales para tu hogar con
              calidad, variedad y precios convenientes.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#productos"
                className="inline-block rounded-lg bg-red-700 px-5 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-red-800"
              >
                Ver productos
              </a>
              <Link
                to="/articulos/nuevo"
                className="inline-block rounded-lg border border-red-200 bg-white px-5 py-3 font-semibold text-red-800 transition-colors hover:border-red-300 hover:bg-red-50"
              >
                Agregar producto
              </Link>
            </div>
          </div>
          <div>
            <img
              src={obtenerImagenArticulo('img/inicio.jpg')}
              className="mx-auto h-72 w-full rounded-2xl bg-white object-contain p-8 shadow-lg ring-1 ring-red-100 md:h-96"
              alt="Leche fresca disponible en el supermercado"
            />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="ofertas-titulo"
        className="mx-auto w-full max-w-6xl px-4 pt-12 md:px-6"
      >
        <h2
          id="ofertas-titulo"
          className="mb-5 text-3xl font-bold text-gray-900"
        >
          Ofertas
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {imagenesOferta.map((oferta) => (
            <img
              key={oferta.src}
              src={oferta.src}
              alt={`Oferta: ${oferta.nombre}`}
              className="h-full w-full rounded-xl object-cover shadow-sm"
              loading="lazy"
            />
          ))}
        </div>
      </section>

      <section
        id="productos"
        className="mx-auto w-full max-w-6xl scroll-mt-6 px-4 py-14 md:px-6"
      >
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-1 font-semibold text-red-700">Nuestro catálogo</p>
            <h2 className="text-3xl font-bold text-gray-900">Productos</h2>
            <p className="mt-2 text-gray-600">
              Revisa los artículos disponibles y encuentra lo que necesitas.
            </p>
          </div>
          <Link
            to="/articulos/nuevo"
            className="rounded-lg border border-red-200 px-4 py-2 font-semibold text-red-800 transition-colors hover:bg-red-50"
          >
            Agregar producto
          </Link>
        </div>
        <ListadoArticulos />
      </section>
    </>
  )
}

export default Inicio
