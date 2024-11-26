// Importar la clase SubirArchivo
const SubirArchivo = require('./SubirArchivo');

// Crear una instancia de la clase SubirArchivo
const subirArchivo = new SubirArchivo();

// Ruta de la imagen que quieres subir
const rutaImagen = 'image.jpg';

// Función para subir la imagen
async function subirImagen() {
  try {
    // Subir la imagen a Cloudinary
    const resultado = await subirArchivo.subirImagen(rutaImagen);
    
    // Mostrar la información de la imagen subida
    console.log('Imagen subida con éxito:', resultado);
  } catch (error) {
    console.error('Error al subir la imagen:', error.message);
  }
}

// Llamar a la función
subirImagen();
