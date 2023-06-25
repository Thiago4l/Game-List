import React from 'react';
import index from '../index.css';

const SearchBar = ({ handleSearch, handleGenreChange }) => {
  const handleChange = (event) => {
    handleSearch(event);
  };

  return (
    <div className='search-bar'>
        <input type="text"
        className='search-input' 
        placeholder="Pesquisar..." 
        onChange={handleChange} />
        <select className='filter-selector' onChange={handleGenreChange}>
        <option value="">Todos</option>
        <option value="ARPG">ARPG</option>
        <option value="Battle Royale">Battle Royale</option>
        <option value="Card Game">Card Game</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Fighting">Fighting</option>
        <option value="Shooter">Shooter</option>
        <option value="Strategy">Strategy</option>
        <option value="MMO">MMO</option>
        <option value="MMOARPG">MMOARPG</option>
        <option value="MMORPG">MMORPG</option>
        <option value="MOBA">MOBA</option>
        <option value="Racing">Racing</option>
        <option value="Social">Social</option>
        <option value="Sports">Sports</option>
        </select>
    </div>
  );
};

export default SearchBar;
