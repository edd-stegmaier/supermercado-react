import { imagenesDisponibles } from '../data/imagenesArticulos.js'

export function normalizarArticulo(valores = {}) {
  return {
    nombre: typeof valores.nombre === 'string' ? valores.nombre.trim() : '',
    marca: typeof valores.marca === 'string' ? valores.marca.trim() : '',
    precio: valores.precio === '' ? Number.NaN : Number(valores.precio),
    descripcion:
      typeof valores.descripcion === 'string'
        ? valores.descripcion.trim()
        : '',
    imagen: typeof valores.imagen === 'string' ? valores.imagen.trim() : '',
    categoria:
      typeof valores.categoria === 'string' ? valores.categoria.trim() : '',
    stock: valores.stock === '' ? Number.NaN : Number(valores.stock),
  };
}

export function validarArticulo(valores) {
  const datos = normalizarArticulo(valores);
  const errores = {};

  if (!datos.nombre) {
    errores.nombre = 'El nombre del producto es obligatorio.'
  } else if (datos.nombre.length > 100) {
    errores.nombre = 'El nombre no puede superar los 100 caracteres.'
  }

  if (!datos.marca) {
    errores.marca = 'La marca es obligatoria.'
  }

  if (!Number.isInteger(datos.precio) || datos.precio <= 0) {
    errores.precio = 'Ingresa un precio entero mayor que cero.'
  }

  if (!datos.descripcion) {
    errores.descripcion = 'La descripción es obligatoria.'
  } else if (datos.descripcion.length > 500) {
    errores.descripcion = 'La descripción no puede superar los 500 caracteres.'
  }

  if (!imagenesDisponibles.some((imagen) => imagen.ruta === datos.imagen)) {
    errores.imagen = 'Selecciona una imagen disponible para el producto.'
  }

  if (!datos.categoria) {
    errores.categoria = 'La categoría es obligatoria.'
  }

  if (!Number.isInteger(datos.stock) || datos.stock < 0) {
    errores.stock = 'El stock debe ser un número entero igual o mayor que cero.'
  }

  return {
    esValido: Object.keys(errores).length === 0,
    errores,
    datos,
  };
}
