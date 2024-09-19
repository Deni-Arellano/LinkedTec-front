import React from 'react';
import '../hojas-de-estilo/Searchbar.css';

function SearchBar() {
    // Comentamos la función hasta que se use
    // const handleSearch = () => {
    //    console.log('Aquí es la lógica de buscar');
    // };

    return (
        <form className="searchbar-form">
            <input id='busquedastyle' type="text" placeholder="Buscar..." />
        </form>
    );
}

export default SearchBar;
