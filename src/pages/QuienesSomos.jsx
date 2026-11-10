import { Link } from 'react-router'
import { obtenerImagenArticulo } from '../data/imagenesArticulos.js'

const valores = [
  {
    titulo: 'Calidad',
    descripcion:
      'Seleccionamos productos confiables para acompañar tus compras de todos los días.',
  },
  {
    titulo: 'Cercanía',
    descripcion:
      'Queremos que encontrar lo que necesitas sea una experiencia simple y amable.',
  },
  {
    titulo: 'Variedad',
    descripcion:
      'Reunimos alimentos y artículos esenciales para distintos momentos de tu hogar.',
  },
  {
    titulo: 'Compromiso',
    descripcion:
      'Trabajamos para ofrecer una atención responsable y precios convenientes.',
  },
]

function QuienesSomos() {
  return (
    <>
      <section className="bg-gradient-to-br from-red-50 via-white to-white">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-14 md:grid-cols-2 md:px-6 lg:py-20">
          <div>
            <p className="mb-3 font-semibold uppercase tracking-wide text-red-700">
              Conoce nuestro supermercado
            </p>
            <h1 className="mb-5 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Cerca de ti y de lo que más importa
            </h1>
            <p className="max-w-xl text-lg text-gray-600">
              Somos un supermercado pensado para hacer más fácil la compra de
              cada día. Reunimos productos para tu hogar con una atención
              cercana, variedad y calidad.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { imagen: 'img/leche.jpg', nombre: 'Leche fresca' },
              { imagen: 'img/pan.jpg', nombre: 'Pan integral' },
              { imagen: 'img/arroz.jpg', nombre: 'Arroz' },
              { imagen: 'img/queso.jpg', nombre: 'Queso' },
            ].map((producto) => (
              <div
                className="flex h-40 items-center justify-center rounded-2xl bg-white p-4 shadow-sm md:h-48"
                key={producto.imagen}
              >
                <img
                  src={obtenerImagenArticulo(producto.imagen)}
                  alt={producto.nombre}
                  className="h-full w-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <p className="mb-2 font-semibold text-red-700">Nuestro propósito</p>
        <h2 className="mb-3 text-3xl font-bold text-gray-900">
          Hacer más simple cada compra
        </h2>
        <p className="max-w-4xl text-lg text-gray-600">
          Creemos que abastecer el hogar debe ser fácil y conveniente. Por eso
          buscamos ofrecer un catálogo útil, productos de calidad y una
          experiencia cercana, para que puedas dedicar tu tiempo a lo que más
          quieres.
        </p>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6">
        <div className="grid gap-5 md:grid-cols-2">
          <article className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <h2 className="mb-2 text-2xl font-bold text-red-800">Misión</h2>
            <p className="text-gray-600">
              Acercar a cada familia los productos que necesita, con calidad,
              buenos precios y una atención cordial en cada visita.
            </p>
          </article>
          <article className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <h2 className="mb-2 text-2xl font-bold text-red-800">Visión</h2>
            <p className="text-gray-600">
              Ser el supermercado de confianza del barrio, reconocido por su
              cercanía, variedad y compromiso con sus clientes.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <p className="mb-2 font-semibold text-red-700">Lo que nos inspira</p>
        <h2 className="mb-6 text-3xl font-bold text-gray-900">Nuestros valores</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {valores.map((valor) => (
            <article
              className="rounded-xl bg-white p-5 text-center shadow-sm ring-1 ring-gray-200"
              key={valor.titulo}
            >
              <h3 className="mb-2 text-lg font-bold text-red-800">
                {valor.titulo}
              </h3>
              <p className="text-sm text-gray-600">{valor.descripcion}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 md:px-6">
        <div className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-red-800 p-7 text-white shadow-sm md:flex-row md:items-center md:p-9">
          <div>
            <h2 className="mb-2 text-2xl font-bold">Estamos cerca de ti</h2>
            <p className="text-red-100">
              Encuentra tu sucursal y ven a conocernos.
            </p>
          </div>
          <Link
            to="/nuestras-tiendas"
            className="rounded-lg bg-white px-5 py-3 font-semibold text-red-800 transition-colors hover:bg-red-50"
          >
            Conoce nuestras tiendas
          </Link>
        </div>
      </section>
    </>
  )
}

export default QuienesSomos
