import { Link } from 'react-router'

const tiendas = [
  {
    nombre: 'Sucursal Centro',
    comuna: 'Santiago Centro',
    direccion: 'Av. Libertador Bernardo O’Higgins 1234',
    horario: 'Lunes a sábado, 9:00 a 20:00',
  },
  {
    nombre: 'Sucursal Oriente',
    comuna: 'Ñuñoa',
    direccion: 'Av. Irarrázaval 2345',
    horario: 'Lunes a sábado, 9:00 a 20:00',
  },
  {
    nombre: 'Sucursal Poniente',
    comuna: 'Maipú',
    direccion: 'Av. Pajaritos 3456',
    horario: 'Lunes a sábado, 9:00 a 20:00',
  },
]

function IconoUbicacion() {
  return (
    <svg
      aria-hidden="true"
      className="h-7 w-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10c0 5.25-7.5 11-7.5 11S4.5 15.25 4.5 10a7.5 7.5 0 1 1 15 0Z"
      />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

function NuestrasTiendas() {
  return (
    <>
      <section className="bg-gradient-to-br from-red-50 via-white to-white">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-14 md:grid-cols-2 md:px-6 lg:py-20">
          <div>
            <p className="mb-3 font-semibold uppercase tracking-wide text-red-700">
              Siempre cerca de tu hogar
            </p>
            <h1 className="mb-5 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Nuestras tiendas
            </h1>
            <p className="max-w-xl text-lg text-gray-600">
              Visítanos en la sucursal que te quede más cómoda. En cada tienda
              encontrarás productos para tu hogar y una atención cercana.
            </p>
          </div>
          <div className="flex min-h-64 items-center justify-center rounded-2xl bg-red-100 p-8 text-red-800 md:min-h-80">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-sm">
                <IconoUbicacion />
              </div>
              <p className="text-xl font-bold">Encuentra tu sucursal</p>
              <p className="mt-1 text-red-700">
                Cerca de ti, todos los días
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <p className="mb-2 font-semibold text-red-700">Te esperamos</p>
        <h2 className="mb-3 text-3xl font-bold text-gray-900">
          Encuentra tu tienda
        </h2>
        <p className="mb-7 max-w-3xl text-gray-600">
          Revisa la ubicación y el horario de atención de cada sucursal antes
          de tu visita.
        </p>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tiendas.map((tienda) => (
            <article
              className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200"
              key={tienda.nombre}
            >
              <div className="flex items-center gap-4 bg-red-50 p-5 text-red-800">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white">
                  <IconoUbicacion />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{tienda.nombre}</h3>
                  <p className="text-sm text-red-700">{tienda.comuna}</p>
                </div>
              </div>
              <div className="space-y-4 p-5">
                <div>
                  <p className="mb-1 text-sm font-semibold text-gray-800">
                    Dirección
                  </p>
                  <p className="text-gray-600">{tienda.direccion}</p>
                </div>
                <div>
                  <p className="mb-1 text-sm font-semibold text-gray-800">
                    Horario de atención
                  </p>
                  <p className="text-gray-600">{tienda.horario}</p>
                  <p className="mt-1 text-sm text-gray-500">Domingo cerrado</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-5 text-sm text-gray-500">
          Las direcciones y horarios publicados son referenciales.
        </p>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 md:px-6">
        <div className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-red-800 p-7 text-white shadow-sm md:flex-row md:items-center md:p-9">
          <div>
            <h2 className="mb-2 text-2xl font-bold">¿Listo para tu próxima compra?</h2>
            <p className="text-red-100">
              Revisa nuestro catálogo y encuentra lo que necesitas.
            </p>
          </div>
          <Link
            to="/#productos"
            className="rounded-lg bg-white px-5 py-3 font-semibold text-red-800 transition-colors hover:bg-red-50"
          >
            Ver productos
          </Link>
        </div>
      </section>
    </>
  )
}

export default NuestrasTiendas
