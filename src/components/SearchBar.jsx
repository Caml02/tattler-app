import React, { useState, useEffect } from 'react';
import RestaurantList from './RestaurantList';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleSearch = async () => {
    const response = await fetch(`http://localhost:3001/search?engine=google_maps&q=${query}&latitude=${latitude}&longitude=${longitude}`);
    const data = await response.json();
    setResults(data);
  };

  return (
    <div id='searchBar'>
      <div className='d-flex container'>
        <input
          className="form-control me-2"
          type="text"
          placeholder="¿Que deseas comer hoy?"
          aria-label="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch} className="btn btn-outline-success">Buscar</button>
        <div className='dropdown'>
        <button id='filter-btn' className='btn btn-outline-success bi bi-funnel-fill' data-bs-toggle='dropdown' aria-expanded='false'></button>
        <ul className='dropdown-menu'>
          <li className='dropdown-item '>Abierto</li>
          <li className='dropdown-item '>Para Llevar</li>
          <li className='dropdown-item '>A domicilio</li>
        </ul>
        </div>
      </div>
      <div className='RestaurantList'>
          {results && results.local_results && results.local_results.length > 0 && (
            <>
            {results.local_results.slice(0, 3).map((result, index) => (
              <RestaurantList key={result.place_id} results={{ local_results: [result] }} 
              index={index}
              />
            ))}
            </>
          )}
      </div>
    </div>
  );
};

export default SearchBar;
