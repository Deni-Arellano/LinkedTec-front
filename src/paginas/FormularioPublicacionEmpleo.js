import React from 'react';
import MenuNavegacion from '../componetes/MenuNavegacion'; // Asegura que la ruta sea correcta
import Etiquetas from '../componetes/Etiquetas'; // Asegura que la ruta sea correcta
import CajaDeTexto from '../componetes/Caja-de-texto'; // Asegura que la ruta sea correcta
import Button from '../componetes/Button'; // Asegura que la ruta sea correcta
import '../hojas-de-estilo/PaginaEmpleo.css'; // Verifica que el archivo CSS existe

const PaginaFormulario = () => {
    return (
        <>
            <MenuNavegacion /> {/* Asegura que la barra de navegación funcione correctamente */}
            <div className="container">
                <div className="form">
                    {/* Título del formulario */}
                    <Etiquetas tamano={20} texto="+ Nuevo Empleo" id="titulo-publicacion-empleo" />
                    &nbsp;

                    {/* Campo para Título de empleo */}
                    <div className="input-group">
                        <Etiquetas tamano={14} texto="Título empleo:" />
                        <CajaDeTexto id="titulo-empleo" />
                    </div>

                    {/* Campo para Empresa */}
                    <div className="input-group">
                        <Etiquetas tamano={14} texto="Empresa:" />
                        <CajaDeTexto id="empresa" />
                    </div>

                    {/* Campo para Salario */}
                    <div className="input-group">
                        <Etiquetas tamano={14} texto="Salario:" />
                        <CajaDeTexto id="salario" placeholder="$" />
                    </div>

                    {/* Campo para Descripción */}
                    <div className="input-group">
                        <Etiquetas tamano={14} texto="Descripción:" />
                        <CajaDeTexto id="descripcion" className="descripcion-textarea" multiline />
                    </div>

                    {/* Campo para Ubicación */}
                    <div className="input-group">
                        <Etiquetas tamano={14} texto="Ubicación (Estado):" />
                        <CajaDeTexto id="ubicacion" />
                    </div>

                    {/* Selección de Nivel de Inglés */}
                    <div className="input-group">
                        <Etiquetas tamano={14} texto="Nivel de Inglés requerido:" />
                        <select id="nivel-ingles" className="dropdown">
                            <option value="avanzado">Avanzado</option>
                            <option value="intermedio">Intermedio</option>
                            <option value="basico">Básico</option>
                            <option value="no-aplica">No aplica</option>
                        </select>
                    </div>

                    {/* Botón para Publicar */}
                    <Button texto="Publicar empleo" />
                </div>
            </div>
        </>
    );
};

export default PaginaFormulario;
