import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = ({ setInputTitle, setInputPriceMin, setInputPriceMax, setInputSort }) => { 

  const [inputTitleTmp, setInputTitleTmp] = useState("");
  
  const handleInputTitleChange = e => { setInputTitleTmp(e.target.value); };
  const handleInputPriceMinChange = e => { setInputPriceMin(e.target.value); };
  const handleInputPriceMaxChange = e => { setInputPriceMax(e.target.value); };
  const handleInputSortChange = e => { setInputSort(e.target.value); };

  const handleSubmitSearch = async (e) => {
    try {
      e.preventDefault();
      setInputTitle(inputTitleTmp); //on récupère l'input après avoir cliqué
    } catch (error) { console.log(error.message); }
  }


  return (
    <div className="search-container">
      <div className="elipsis-container">
        <div />
      </div>

      <div className="search-bar">

        <form onSubmit={handleSubmitSearch}>
          <div className="form-search-input">
            <input type="text" className="inputSearch" onChange={handleInputTitleChange} placeholder="Que recherchez-vous ?" />
            <FontAwesomeIcon className="form-search-icon" icon="search" />
          </div>
          <input type="submit" value="Rechercher" />
        </form>

      </div>

      <div className="prices-sort">
        Prix entre
        <input className="price-min" type="text" onChange={handleInputPriceMinChange} placeholder="prix min" />
        et
        <input className="price-max" type="text" onChange={handleInputPriceMaxChange} placeholder="prix max" />
      
        <select className="sort" onChange={handleInputSortChange}>
          <option value="date-desc">Tri : Plus récentes</option>
          <option value="date-asc">Tri : Plus anciennes</option>
          <option value="price-asc">Tri : Prix croissants</option>
          <option value="price-desc">Tri : Prix décroissants</option>
        </select>
      </div>
       
    </div>
  );
}

export default Search;