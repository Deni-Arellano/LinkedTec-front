import React, { useContext, useState } from 'react';
import MenuNavegacion from '../componetes/MenuNavegacion'; 
import Etiquetas from '../componetes/Etiquetas'; 
import CajaDeTexto from '../componetes/Caja-de-texto';
import Button from '../componetes/Button'; 
import '../hojas-de-estilo/PaginaEmpleo.css'; 
import {usuarioContext} from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  

const PaginaFormulario = () => {
    const {usuarioLog, setUsuarioLog} = useContext(usuarioContext);
    //console.log("Usuario en formulario publicacion empleo: ", usuarioLog)
    //const usuarioLog=2;

    
    const [usuarioCreador, setUsuarioCreador] = useState(usuarioLog);
    const [tituloEmpleo, settituloEmpleo] = useState('');
    const [empresa, setempresa] = useState('');
    const [salario, setSalario] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [Ubicacion, setUbicacion] = useState('');
    const [nivelIngles, setNivelIngles] = useState('Avanzado');

    const navigate = useNavigate(); 


    const handleBack = () => {
    console.log("Navegando a /PublicacionEmpleo");
    navigate('/publicacion-empleo'); 
  };


    const add = () => {
        console.log('Titulo empleo: ' + tituloEmpleo)
        console.log('Empresa: ' + empresa)
        console.log('Salario: ' + salario)
        console.log('Descripcion: ' + descripcion)
        console.log('Ubicacion: ' + Ubicacion)
        console.log('Nivel de ingles: ' + nivelIngles)
        console.log('Usuario creador: ' + usuarioCreador)

        if (!tituloEmpleo) {
            console.log("El titulo de empleo no debe estar vacio");
            return; 
        }

        if (tituloEmpleo.length > 50) {
            console.log("El titulo de empleo no debe tener mas de 50 caracteres");
            return; 
        }

        if (!empresa) {
            console.log("Empresa no debe estar vacio");
            return; 
        }

        if (!salario) {
            console.log("El Salario no debe estar vacio");
            return; 
        }

        if (salario.length > 9) {
            console.log("El salario no debe tener mas de 9 cifras");
            return; 
        }

        if (!/^\d+$/.test(salario)) {
            console.log("El salario debe contener solo dígitos.");
            return;
        }

        if (!descripcion) {
            console.log("La descripcion no debe estar vacia");
            return; 
        }

        if (descripcion.length > 5000) {
            console.log("La descripcion no debe tener mas de 5000 caracteres");
            return; 
        }

        if (!Ubicacion) {
            console.log("La ubicacion no debe estar vacia");
            return; 
        }

        if (Ubicacion.length > 100) {
            console.log("La ubicacion no debe tener mas de 100 caracteres");
            return; 
        }

        const datosEnviar = {
            "titulo": tituloEmpleo,
            "empresa": empresa,
            "salario": salario,
            "descripcion": descripcion,
            "ubicacion": Ubicacion,
            "nivel_de_ingles": nivelIngles,
            "id_usuario": usuarioCreador
    
        }

        console.log(datosEnviar);

        axios.post('http://localhost:3000/empleos', datosEnviar)
        .then((response) => {
            //Muestra los datos devueltos por el servidor y agrega el id al contexto
            console.log("Respuesta del servidor:", response.data);
            console.log("Usuario guardado sin actualizar:", usuarioLog);

            //PONER MENSAJE EMERGENTE DE EMPLEO CREADO EXITOSAMENTE
            handleBack();
            
            
          })
          .catch((error) => {
            if (error.response.status===400) {
                console.log('Bad request, la solicitud es invalida o no puede ser procesada')
            }

            if (error.response.status===404) {
                console.log('Not found, El recurso solicitado no existe')
            }

            if (error.response.status===500) {
                console.log('Internal server error, error general del servidor en caso de que no retorne algun mensaje especifico')
            }

            if (error.response.status===422) {
                console.log('Unprocessable entity, La solicitud esta bien formada pero contiene errores semanticos')
            }

            if (error.response) {

                console.log("Error de respuesta del servidor:", error.response.data);
                console.log("Código de estado:", error.response.status);
      
            } else {
                console.log("Error en la solicitud:", error.message);
            }
      
      
          })
          ;
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
                        <CajaDeTexto id="fromularioempleoo-titulo-empleo" 
                        value={tituloEmpleo} 
                        onChange={(e) => settituloEmpleo(e.target.value)} />
                    </div>

                    {/* Campo para Empresa */}
                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Empresa:" />
                        <CajaDeTexto 
                        id="fromularioempleoo-empresa" 
                        value={empresa} 
                        onChange={(e) => setempresa(e.target.value)} />
                    </div>

                    {/* Campo para Salario */}
                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Salario:" />
                        <CajaDeTexto id="fromularioempleoo-salario" 
                        laceholder="$" 
                        value={salario} 
                        onChange={(e) => setSalario(e.target.value)} />
                    </div>

                    {/* Campo para Descripción */}
                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Descripción:" />
                        <textarea id="fromularioempleoo-descripcion" 
                        className="fromularioempleoo-descripcion-textarea" 
                        rows="5" cols="50"
                        value={descripcion} 
                        onChange={(e) => setDescripcion(e.target.value)}>

                        </textarea>
                    </div>

                    {/* Campo para Ubicación */}
                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Ubicación (Estado):" />
                        <CajaDeTexto 
                        id="fromularioempleoo-ubicacion" 
                        value={Ubicacion} 
                        onChange={(e) => setUbicacion(e.target.value)}/>
                    </div>

                    {/* Selección de Nivel de Inglés */}
                    <div className="fromularioempleoo-input-group">
                        <Etiquetas tamano={14} texto="Nivel de Inglés requerido:" />
                        <select id="fromularioempleoo-nivel-ingles" className="fromularioempleoo-dropdown" 
                        value={nivelIngles} 
                        onChange={(e) => setNivelIngles(e.target.value)}>
                            <option value="Avanzado">Avanzado</option>
                            <option value="Intermedio">Intermedio</option>
                            <option value="Básico">Básico</option>
                            <option value="No aplica">No aplica</option>
                        </select>
                    </div>

                    {/* Botón para Publicar */}
                    <Button texto="Publicar empleo" onClick={add} />
                </div>
            </div>
        </>
    );
};

export default PaginaFormulario;
