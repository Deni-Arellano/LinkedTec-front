import React, { useContext, useState } from 'react';
import MenuNavegacion from '../componetes/MenuNavegacion'; 
import Etiquetas from '../componetes/Etiquetas'; 
import CajaDeTexto from '../componetes/Caja-de-texto';
import Button from '../componetes/Button'; 
import '../hojas-de-estilo/PaginaEmpleo.css'; 
import {usuarioContext} from '../App';

const PaginaFormulario = () => {
    const {usuarioLog, setUsuarioLog} = useContext(usuarioContext);

    const [tituloEmpleo, settituloEmpleo] = useState('');
    const [empresa, setempresa] = useState('');
    const [Salario, setSalario] = useState('');
    const [Descripcion, setDescripcion] = useState('');
    const [Ubicacion, setUbicacion] = useState('');
    const [NivelIngles, setNivelIngles] = useState('Avanzado');

    const agregar = () => {
        console.log('Titulo empleo: ' + tituloEmpleo)
        console.log('Empresa: ' + empresa)
        console.log('Salario: ' + Salario)
        console.log('Descripcion: ' + Descripcion)
        console.log('Ubicacion: ' + Ubicacion)
        console.log('Nivel de ingles: ' + NivelIngles)

        if (!tituloEmpleo) {
            console.log("El titulo de empleo no debe estar vacio");
            return; 
        }

        if (!empresa) {
            console.log("Empresa no debe estar vacio");
            return; 
        }

        if (!Salario) {
            console.log("El Salario no debe estar vacio");
            return; 
        }

        if (!/^\d+$/.test(Salario)) {
            console.log("El salario debe contener solo dígitos.");
            return;
        }

        if (!Descripcion) {
            console.log("La descripcion no debe estar vacia");
            return; 
        }

        if (!Ubicacion) {
            console.log("La ubicacion no debe estar vacia");
            return; 
        }

        const datosEnviar = {
            "formularioEmpleo": {
            "titulo": tituloEmpleo,
            "empresa": empresa,
            "salario": Salario,
            "Descripcion": Descripcion,
            "Ubicacion": Ubicacion,
            "Nivel de ingles:": NivelIngles
           }
        }

        console.log(datosEnviar);
    }

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
                        <CajaDeTexto id="fromularioempleoo-titulo-empleo" value={tituloEmpleo} onChange={(e) => settituloEmpleo(e.target.value)} />
                    </div>

                    {/* Campo para Empresa */}
                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Empresa:" />
                        <CajaDeTexto id="fromularioempleoo-empresa" value={empresa} onChange={(e) => setempresa(e.target.value)} />
                    </div>

                    {/* Campo para Salario */}
                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Salario:" />
                        <CajaDeTexto id="fromularioempleoo-salario" placeholder="$" value={Salario} onChange={(e) => setSalario(e.target.value)} />
                    </div>

                    {/* Campo para Descripción */}
                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Descripción:" />
                        <textarea id="fromularioempleoo-descripcion" className="fromularioempleoo-descripcion-textarea" rows="5" cols="50"
                        value={Descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
                    </div>

                    {/* Campo para Ubicación */}
                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Ubicación (Estado):" />
                        <CajaDeTexto id="fromularioempleoo-ubicacion" value={Ubicacion} onChange={(e) => setUbicacion(e.target.value)}/>
                    </div>

                    {/* Selección de Nivel de Inglés */}
                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Nivel de Inglés requerido:" />
                        <select id="fromularioempleoo-nivel-ingles" className="fromularioempleoo-dropdown" value={NivelIngles} onChange={(e) => setNivelIngles(e.target.value)}>
                            <option value="avanzado">Avanzado</option>
                            <option value="intermedio">Intermedio</option>
                            <option value="basico">Básico</option>
                            <option value="no-aplica">No aplica</option>
                        </select>
                    </div>

                    {/* Botón para Publicar */}
                    <Button texto="Publicar empleo" onClick={agregar} />
                </div>
            </div>
        </>
    );
};

export default PaginaFormulario;
