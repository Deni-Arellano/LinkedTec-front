import React, { useContext, useState, useEffect } from "react";
import "./publicaciones.css";
import MenuNavegacion from "../../components/menunavegacion/MenuNavegacion";
import Crearpubli from "../../components/componente-crear-publicacion/CrearPublicacion";
import Axios from "axios";
import { usuarioContext } from "../../App";
import Swal from "sweetalert2";
import MostarPublicacion from "../../components/componente-mostrar-publicacion/MostrarPublicacion";

const PubliUsuarios = () => {
  const { usuarioLog, setUsuarioLog } = useContext(usuarioContext);
  const [esReclutador, setEsReclutador] = useState(false);
  const [paginaPublicaciones, setPaginaPublicaciones] = useState(1);
  const [publicaciones, setPublicaciones] = useState([]);
  const [componentesPublicaciones, setComponentesPublicaciones] = useState([]);

  useEffect(() => {
    const verificarRolUsuario = async () => {
      const datosUsuario = await getUsuarios(usuarioLog);
      if (datosUsuario[4] === "Reclutadores") {
        setEsReclutador(true);
      }
    };
    verificarRolUsuario();

    const getPublicationsWithPagination = async () => {
      const publicationsData = await getPublicaciones(paginaPublicaciones, 10);
      if (publicationsData) {
        setPublicaciones(publicationsData.publicaciones);
      } else {
        setPublicaciones([]);
      }
    };

    getPublicationsWithPagination();
  }, [paginaPublicaciones, usuarioLog]);

  useEffect(() => {
    const generarComponentesPublicaciones = async () => {
      const componentesPublicacionesPromises = publicaciones.map(async (publicacion) => {
        const datosUsuario = await getUsuarios(publicacion.id_usuario);
        return (
          <MostarPublicacion
            key={publicacion.id_publicacion}
            datos={{
              id: publicacion.id_usuario,
              descripcion: publicacion.descripcion,
              imagen: publicacion.imagen,
              fecha: publicacion.fecha,
              meGusta: publicacion.me_gusta,
              disgusta: publicacion.disgusta,
              fotoPerfil:
                datosUsuario[3] ||
                "https://res.cloudinary.com/dsysk6y0t/image/upload/v1729878506/images/cvaawi9imiuzbninnmj8.jpg",
              nombreUsuario: `${datosUsuario[0] || ""} ${datosUsuario[1] || ""} ${
                datosUsuario[2] || ""
              }`,
              id_publicacion: publicacion.id_publicacion,
            }}
            onEliminar={(id) => {
              setPublicaciones((prevPublicaciones) =>
                prevPublicaciones.filter((publicacion) => publicacion.id_publicacion !== id)
              );
            }}
          />
        );
      });
      const componentes = await Promise.all(componentesPublicacionesPromises);
      setComponentesPublicaciones(componentes);
    };

    generarComponentesPublicaciones();
  }, [publicaciones, usuarioLog]);

  const mostrarAlerta = (mensaje, icono) => {
    Swal.fire({
      title: mensaje,
      icon: icono,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Entendido",
    });
  };

  const getUsuarios = async (id) => {
    try {
      const response = await Axios.get(`http://localhost:3000/usuarios/${id}`);
      //console.log("Datos del usuarioen el get:", response.data);
      return [
        response.data.nombre,
        response.data.apellido_paterno,
        response.data.apellido_materno,
        response.data.imagen_usuario,
        response.data.role,

      ];
    } catch (err) {
      console.error("Error al obtener el usuario:", err);
      return [];
    }
  };

  const getPublicaciones = async (page = 1, limit = 10) => {
    try {
      const response = await Axios.get(
        `http://localhost:3000/publicaciones?pagina=${page}&limite=${limit}&informacionCompleta=true`
      );
      console.log("Datos de las publicaciones:", response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error al obtener las publicaciones:", error.response.data);
        mostrarAlerta("Error al cargar las publicaciones", "error");
      }
      return null;
    }
  };

  return (
    <>
      <div className="Menu-principal">
        <MenuNavegacion />
      </div>
      <div className="contenedor-invisible">
        <div className="Crear-publicacion">
          {!esReclutador && <Crearpubli />}
        </div>
        <div className="Publicaciones">{componentesPublicaciones}</div>
      </div>
    </>
  );
};

export default PubliUsuarios;