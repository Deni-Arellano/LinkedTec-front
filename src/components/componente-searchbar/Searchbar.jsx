import React from 'react';
import './Searchbar.css';
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
                <input id='searchbar-style' type="text" placeholder="Buscar..." onKeyDown={handleKeyDown}
                />
                <HiOutlineSearch className="searchbar-icon" />
            </div>
        </form>
    );
}

export default SearchBar;