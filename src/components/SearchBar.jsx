import React, { useState, useEffect } from 'react';
import RestaurantList from './RestaurantList';
import swal from 'sweetalert';


const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('Cualquier horario');

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

  useEffect(() => {
    if (results) {
      handleSearch(); 
    }
  }, [selectedFilter]);


  const handleSearch = async () => {
    const response = await fetch(`http://localhost:3001/search?engine=google_maps&q=${query}&latitude=${latitude}&longitude=${longitude}&openStateFilter=${selectedFilter}`);
    const data = await response.json();

    // Actualizamos el estado con los nuevos resultados obtenidos de la búsqueda
    setResults(data);

    if (data && data.local_results && data.local_results.length > 0) {
      // Si hay resultados, mostramos hasta 3 restaurantes en la lista
      setResults(data);
    } else {
      // Si no hay resultados, mostramos el mensaje de SweetAlert
      swal("Sin resultados, intenta con otro filtro");
      // Limpiamos los resultados para no mostrar la lista vacía
      setResults(null);
    }
  };

  return (
    <div id='searchBar'>
      <div className='d-flex container'>
        <input
          className="form-control me-2"
          type="text"
          placeholder="¿Qué deseas comer hoy?"
          aria-label="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className='btn-group'>
          <button onClick={handleSearch} className="btn btn-outline-success" type='button'>Buscar</button>
          <button id='filter-btn' type='button' className='btn btn-outline-success dropdown-toggle' data-bs-toggle='dropdown' data-bs-auto-close="outside" aria-expanded='false'>
            </button>
          <div className='dropdown'>
            <ul className='dropdown-menu'>
              <li className={`dropdown-item ${selectedFilter === 'Cualquier horario' ? 'active' : ''}`} onClick={() => setSelectedFilter('Cualquier horario')}>Cualquier horario</li>
              <li className={`dropdown-item ${selectedFilter === 'Abierto Ahora' ? 'active' : ''}`} onClick={() => setSelectedFilter('Abierto Ahora')}>Abierto Ahora</li>
              <li className={`dropdown-item ${selectedFilter === 'Abierto 24 horas' ? 'active' : ''}`} onClick={() => setSelectedFilter('Abierto 24 horas')}>Abierto 24 horas</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='RestaurantList'>
        {results && results.local_results && results.local_results.length > 0 && (
          <>
            {results.local_results.slice(0, 3).map((result, index) => (
              <RestaurantList key={result.place_id} results={{ local_results: [result] }} index={index} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
