import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import useArticulos from '../hooks/useArticulos.js'
import { imagenesDisponibles } from '../data/imagenesArticulos.js'
import { validarArticulo } from '../util/validacionesArticulo.js'

const valoresIniciales = {
  nombre: '',
  marca: '',
  precio: '',
  descripcion: '',
  imagen: '',
  categoria: '',
  stock: '',
}

const ordenCampos = [
  'nombre',
  'marca',
  'precio',
  'descripcion',
  'imagen',
  'categoria',
  'stock',
]

function NuevoArticulo() {
  const [valores, setValores] = useState(valoresIniciales)
  const [errores, setErrores] = useState({})
  const { agregarArticulo } = useArticulos()
  const navigate = useNavigate()

  const referencias = useRef({})

  const manejarCambio = (evento) => {
    const { name, value } = evento.target
    setValores((previos) => ({ ...previos, [name]: value }))
  }

  const manejarEnvio = (evento) => {
    evento.preventDefault()

    const { esValido, errores: nuevosErrores, datos } = validarArticulo(valores)

    if (!esValido) {
      setErrores(nuevosErrores)
      const primerInvalido = ordenCampos.find((campo) => nuevosErrores[campo])
      if (primerInvalido) {
        referencias.current[primerInvalido]?.focus()
      }
      return
    }

    const resultado = agregarArticulo(datos)

    if (resultado.exito) {
      navigate('/')
    } else {
      setErrores(resultado.errores)
    }
  }

  const clasesCampo = (nombre) =>
    errores[nombre]
      ? 'w-full rounded-md border border-red-500 px-3 py-2 text-base focus:outline-none'
      : 'w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:border-red-600 focus:outline-none'

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
      <div className="mb-7">
        <p className="mb-1 font-semibold text-red-700">Catálogo</p>
        <h1 className="mb-3 text-4xl font-bold text-gray-900">
          Agregar producto
        </h1>
        <p className="max-w-2xl text-gray-600">
          Completa los datos del producto. Al guardarlo, aparecerá en el
          catálogo de la página de inicio.
        </p>
      </div>

      <form
        noValidate
        onSubmit={manejarEnvio}
        className="max-w-3xl rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200"
      >
        {Object.keys(errores).length > 0 && (
          <div
            role="alert"
            className="mb-4 rounded-md border border-red-300 bg-red-50 p-4 text-red-700"
          >
            <p className="mb-1 font-semibold">Revisa los siguientes errores:</p>
            <ul className="list-disc pl-5 text-sm">
              {Object.values(errores).map((mensaje) => (
                <li key={mensaje}>{mensaje}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="nombre" className="mb-1 block font-semibold text-gray-800">
              Nombre del producto
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={valores.nombre}
              onChange={manejarCambio}
              ref={(elemento) => { referencias.current.nombre = elemento }}
              required
              maxLength={100}
              aria-invalid={errores.nombre ? true : undefined}
              aria-describedby={errores.nombre ? 'nombre-error' : undefined}
              className={clasesCampo('nombre')}
            />
            {errores.nombre && <p id="nombre-error" className="mt-1 text-sm text-red-600">{errores.nombre}</p>}
          </div>

          <div>
            <label htmlFor="marca" className="mb-1 block font-semibold text-gray-800">
              Marca
            </label>
            <input
              id="marca"
              name="marca"
              type="text"
              value={valores.marca}
              onChange={manejarCambio}
              ref={(elemento) => { referencias.current.marca = elemento }}
              required
              aria-invalid={errores.marca ? true : undefined}
              aria-describedby={errores.marca ? 'marca-error' : undefined}
              className={clasesCampo('marca')}
            />
            {errores.marca && <p id="marca-error" className="mt-1 text-sm text-red-600">{errores.marca}</p>}
          </div>

          <div>
            <label htmlFor="precio" className="mb-1 block font-semibold text-gray-800">
              Precio (CLP)
            </label>
            <input
              id="precio"
              name="precio"
              type="number"
              min="1"
              step="1"
              value={valores.precio}
              onChange={manejarCambio}
              ref={(elemento) => { referencias.current.precio = elemento }}
              required
              aria-invalid={errores.precio ? true : undefined}
              aria-describedby={errores.precio ? 'precio-error' : undefined}
              className={clasesCampo('precio')}
            />
            {errores.precio && <p id="precio-error" className="mt-1 text-sm text-red-600">{errores.precio}</p>}
          </div>

          <div>
            <label htmlFor="categoria" className="mb-1 block font-semibold text-gray-800">
              Categoría
            </label>
            <input
              id="categoria"
              name="categoria"
              type="text"
              value={valores.categoria}
              onChange={manejarCambio}
              ref={(elemento) => { referencias.current.categoria = elemento }}
              required
              aria-invalid={errores.categoria ? true : undefined}
              aria-describedby={errores.categoria ? 'categoria-error' : undefined}
              className={clasesCampo('categoria')}
            />
            {errores.categoria && <p id="categoria-error" className="mt-1 text-sm text-red-600">{errores.categoria}</p>}
          </div>

          <div>
            <label htmlFor="stock" className="mb-1 block font-semibold text-gray-800">
              Stock disponible
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              min="0"
              step="1"
              value={valores.stock}
              onChange={manejarCambio}
              ref={(elemento) => { referencias.current.stock = elemento }}
              required
              aria-invalid={errores.stock ? true : undefined}
              aria-describedby={errores.stock ? 'stock-error' : undefined}
              className={clasesCampo('stock')}
            />
            {errores.stock && <p id="stock-error" className="mt-1 text-sm text-red-600">{errores.stock}</p>}
          </div>

          <div>
            <label htmlFor="imagen" className="mb-1 block font-semibold text-gray-800">
              Imagen del producto
            </label>
            <select
              id="imagen"
              name="imagen"
              value={valores.imagen}
              onChange={manejarCambio}
              ref={(elemento) => { referencias.current.imagen = elemento }}
              required
              aria-invalid={errores.imagen ? true : undefined}
              aria-describedby={errores.imagen ? 'imagen-error' : undefined}
              className={clasesCampo('imagen')}
            >
              <option value="">Selecciona una imagen</option>
              {imagenesDisponibles.map((imagen) => (
                <option key={imagen.ruta} value={imagen.ruta}>{imagen.nombre}</option>
              ))}
            </select>
            {errores.imagen && <p id="imagen-error" className="mt-1 text-sm text-red-600">{errores.imagen}</p>}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="descripcion" className="mb-1 block font-semibold text-gray-800">
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              rows={4}
              value={valores.descripcion}
              onChange={manejarCambio}
              ref={(elemento) => { referencias.current.descripcion = elemento }}
              required
              maxLength={500}
              aria-invalid={errores.descripcion ? true : undefined}
              aria-describedby={errores.descripcion ? 'descripcion-error' : undefined}
              className={clasesCampo('descripcion')}
            />
            {errores.descripcion && <p id="descripcion-error" className="mt-1 text-sm text-red-600">{errores.descripcion}</p>}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="submit"
            className="inline-block rounded-md bg-red-700 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-800"
          >
            Guardar producto
          </button>
          <Link
            to="/"
            className="inline-block rounded-md border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-100"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </section>
  )
}

export default NuevoArticulo
