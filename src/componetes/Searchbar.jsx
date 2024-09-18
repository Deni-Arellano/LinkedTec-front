import React from 'react';
import '../hojas-de-estilo/Searchbar.css';
import { HiOutlineSearch } from "react-icons/hi";

function SearchBar() {
    const handleSearch = () => {
        console.log('Aquí es la lógica de buscar');
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSearch();
        }
    };

    return (
        <form className="searchbar-form">
            <div className="searchbar-container">
                <input id='busquedastyle' type="text" placeholder="Buscar..." onKeyDown={handleKeyDown}
                />
                <HiOutlineSearch className="search-icon" />
            </div>
        </form>
    );
}

export default SearchBar;