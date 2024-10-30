import React from 'react';
import './ComponenteSearchbarBuscarPostulantesComoReclutador.css';
import { HiOutlineSearch } from "react-icons/hi";

function SearchBar({ value, onChange }) {
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
        <form className="searchbar-form" onSubmit={(e) => e.preventDefault()}>
            <div className="searchbar-container">
                <input 
                    id='searchbar-style' 
                    type="text" 
                    placeholder="Buscar..." 
                    value={value} 
                    onChange={onChange} 
                    onKeyDown={handleKeyDown}
                />
                <HiOutlineSearch className="searchbar-icon" />
            </div>
        </form>
    );
}

export default SearchBar;
