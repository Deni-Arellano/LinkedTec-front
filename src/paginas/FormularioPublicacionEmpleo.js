import React from 'react';
import MenuNavegacion from '../componetes/MenuNavegacion'; // Cambiar de BarraSuperior a MenuNavegacion
import Etiquetas from '../componetes/Etiquetas'; // Ajusta la ruta según tu estructura
import CajaDeTexto from '../componetes/Caja-de-texto'; // Ajusta la ruta según tu estructura
import Button from '../componetes/Button'; // Ajusta la ruta según tu estructura
import '../hojas-de-estilo/PaginaEmpleo.css'; // Asegúrate de que el archivo existe en la misma carpeta

const PaginaFormulario = () => {
    return (
        <>
            <MenuNavegacion /> {/* Cambiado de BarraSuperior a MenuNavegacion */}
            <div className="container">
                <div className="form">
                    <Etiquetas tamano={20} texto="+ Nuevo Empleo" />
                    
                    <div className="input-group">
                        <Etiquetas tamano={14} texto="Titulo empleo:" />
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
                        <Etiquetas tamano={14} texto="Descripcion:" />
                        <CajaDeTexto id="descripcion" className="descripcion-textarea" multiline />
                    </div>

                    <div className="input-group">
                        <Etiquetas tamano={14} texto="Ubicacion (Estado):" />
                        <CajaDeTexto id="ubicacion" />
                    </div>

                    <div className="input-group">
                        <Etiquetas tamano={14} texto="Nivel de Ingles requerido:" />
                        <select id="nivel-ingles" className="dropdown">
                            <option value="avanzado">Avanzado</option>
                            <option value="intermedio">Intermedio</option>
                            <option value="basico">Basico</option>
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
