const cloudinary = require('cloudinary').v2;

/**
 * Clase para subir archivos e imágenes a Cloudinary.
 */
class SubirArchivo {
  /**
   * Constructor para inicializar la configuración de Cloudinary.
   */
  constructor() {
    /**
     * Configuración de Cloudinary.
     * IMPORTATE: NO SE DEBEN MODIFICAR LOS VALORES DE ESTA CONFIGURACIÓN.
     */
    cloudinary.config({
      cloud_name: 'dsysk6y0t',
      api_key: '558681395524128',
      api_secret: 'SOTK8MjlL-1fU41ERjFoghAQ2rU',
    });
  }

  /**
   * Sube una imagen a Cloudinary.
   * 
   * @param {string} imagePath - La ruta local de la imagen que se quiere subir.
   * @returns {Promise<Object>} Información de la imagen subida, incluyendo:
   * - `asset_id`: Identificador único del recurso.
   * - `public_id`: ID público del recurso.
   * - `format`: Formato de la imagen (ej. jpg, png).
   * - `resource_type`: Tipo de recurso, en este caso 'image'.
   * - `created_at`: Fecha y hora de creación.
   * - `secure_url`: URL segura para acceder a la imagen.
   * - `folder`: Carpeta en la que se almacenó la imagen.
   * - `original_filename`: Nombre original del archivo.
   * @throws {Error} Si no se puede subir la imagen.
   */
  async subirImagen(imagePath) {
    try {
      const result = await cloudinary.uploader.upload(imagePath, {
        folder: 'images',
        resource_type: 'image',
      });

      return {
        asset_id: result.asset_id,
        public_id: result.public_id,
        format: result.format,
        resource_type: result.resource_type,
        created_at: result.created_at,
        secure_url: result.secure_url,
        folder: result.folder,
        original_filename: result.original_filename,
      };
    } catch (error) {
      console.error('Error al subir imagen:', error);
      throw new Error('No se pudo subir la imagen a Cloudinary');
    }
  }

  /**
   * Sube un archivo (PDF, documento, etc.) a Cloudinary.
   * 
   * @param {string} filePath - La ruta local del archivo que se quiere subir.
   * @returns {Promise<Object>} Información del archivo subido, incluyendo:
   * - `asset_id`: Identificador único del recurso.
   * - `public_id`: ID público del recurso.
   * - `format`: Formato del archivo (ej. pdf, docx).
   * - `resource_type`: Tipo de recurso, en este caso 'raw'.
   * - `created_at`: Fecha y hora de creación.
   * - `secure_url`: URL segura para acceder al archivo.
   * - `folder`: Carpeta en la que se almacenó el archivo.
   * - `original_filename`: Nombre original del archivo.
   * @throws {Error} Si no se puede subir el archivo.
   */
  async subirArchivo(filePath) {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'files',
        resource_type: 'raw',
      });

      return {
        asset_id: result.asset_id,
        public_id: result.public_id,
        format: result.format,
        resource_type: result.resource_type,
        created_at: result.created_at,
        secure_url: result.secure_url,
        folder: result.folder,
        original_filename: result.original_filename,
      };
    } catch (error) {
      console.error('Error al subir archivo:', error);
      throw new Error('No se pudo subir el archivo a Cloudinary');
    }
  }
}

module.exports = SubirArchivo;
