import React from 'react';
import '../hojas-de-estilo/list-box.css'; 

const Listbox = () => {
  return (
    <div className="listbox-contenedor">
      <h2>Elige Carrera:</h2>
      <select className="listbox">
        <option value="opcion1">ISC</option>
        <option value="opcion2">IE</option>
        <option value="opcion3">IGE</option>
        <option value="opcion3">CP</option>
        <option value="opcion3">II</option>
        <option value="opcion3">IA</option>
      </select>
    </div>
  );
};

export default Listbox;
