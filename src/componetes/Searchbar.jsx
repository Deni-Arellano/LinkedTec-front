import React from 'react';
import '../hojas-de-estilo/Searchbar.css';
import Button from './Button';

function SearchBar() {
    const handleSearch = () => {
        console.log('Aqui es la logica de buscar');
    };

    return (
        <form className="searchbar-form">
            <input id='busquedastyle' type="text" placeholder="Buscar..." />
            <Button onClick={handleSearch} label="Buscar"/>
        </form>
    );
}

export default SearchBar;