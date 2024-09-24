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
            <div className="fromularioempleoo-container">
                <div className="fromularioempleoo-form">
                    {/* Título del formulario */}
                    <Etiquetas tamano={20} texto="+ Nuevo Empleo" id="fromularioempleoo-titulo-publicacion-empleo" />
                    &nbsp;

                    {/* Campo para Título de empleo */}
                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Título empleo:" />
                        <CajaDeTexto id="fromularioempleoo-titulo-empleo" />
                    </div>

                    {/* Campo para Empresa */}
                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Empresa:" />
                        <CajaDeTexto id="fromularioempleoo-empresa" />
                    </div>

                    {/* Campo para Salario */}
                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Salario:" />
                        <CajaDeTexto id="fromularioempleoo-salario" placeholder="$" />
                    </div>

                    {/* Campo para Descripción */}
                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Descripción:" />
                        <CajaDeTexto id="fromularioempleoo-descripcion" className="fromularioempleoo-descripcion-textarea" multiline />
                    </div>

                    {/* Campo para Ubicación */}
                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Ubicación (Estado):" />
                        <CajaDeTexto id="fromularioempleoo-ubicacion" />
                    </div>

                    {/* Selección de Nivel de Inglés */}
                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Nivel de Inglés requerido:" />
                        <select id="fromularioempleoo-nivel-ingles" className="fromularioempleoo-dropdown">
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
