const archivosImagenes = import.meta.glob('./img/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

export const imagenesDisponibles = Object.entries(archivosImagenes)
  .map(([ruta, url]) => ({
    ruta: ruta.replace('./', ''),
    url,
    nombre: ruta.split('/').at(-1),
  }))
  .sort((primera, segunda) => primera.nombre.localeCompare(segunda.nombre))

export function obtenerImagenArticulo(ruta) {
  const imagen = imagenesDisponibles.find((disponible) => disponible.ruta === ruta)

  if (!imagen) {
    console.log("no se encontro imagen: ", ruta)
    return "/src/assets/image_not_found.png"
  }
  return imagen.url
}
