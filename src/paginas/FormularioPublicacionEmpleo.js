import React from 'react';
import MenuNavegacion from '../componetes/MenuNavegacion'; // Cambiado de BarraSuperior a MenuNavegacion
import Etiquetas from '../componetes/Etiquetas'; // Asegura que la ruta sea correcta
import CajaDeTexto from '../componetes/Caja-de-texto'; // Asegura que la ruta sea correcta
import Button from '../componetes/Button'; // Asegura que la ruta sea correcta
import '../hojas-de-estilo/PaginaEmpleo.css'; // Verifica que el archivo CSS existe

const PaginaFormulario = () => {
    return (
        <>
            <MenuNavegacion /> {/* Cambiado de BarraSuperior a MenuNavegacion */}
            <div className="container">
                <div className="form">
                    <Etiquetas tamano={20} texto="+ Nuevo Empleo" />
                    
                    <div className="input-group">
                        <Etiquetas tamano={14} texto="Título empleo:" />
                        <CajaDeTexto id="titulo-empleo" />
                    </div>

                    <div className="input-group">
                        <Etiquetas tamano={14} texto="Empresa:" />
                        <CajaDeTexto id="empresa" />
                    </div>

                    <div className="input-group">
                        <Etiquetas tamano={14} texto="Salario:" />
                        <CajaDeTexto id="salario" placeholder="$" />
                    </div>

                    <div className="input-group">
                        <Etiquetas tamano={14} texto="Descripción:" />
                        <CajaDeTexto id="descripcion" className="descripcion-textarea" multiline />
                    </div>

                    <div className="input-group">
                        <Etiquetas tamano={14} texto="Ubicación (Estado):" />
                        <CajaDeTexto id="ubicacion" />
                    </div>

                    <div className="input-group">
                        <Etiquetas tamano={14} texto="Nivel de Inglés requerido:" />
                        <select id="nivel-ingles" className="dropdown">
                            <option value="avanzado">Avanzado</option>
                            <option value="intermedio">Intermedio</option>
                            <option value="basico">Básico</option>
                            <option value="no-aplica">No aplica</option>
                        </select>
                    </div>

                    <Button texto="Publicar empleo" />
                </div>
            </div>
        </>
    );
};

export default PaginaFormulario;
