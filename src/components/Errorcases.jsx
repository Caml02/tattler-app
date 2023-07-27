/** 
 * 
 * Restaurant List **********************
 * 
 * import React from 'react';

const RestaurantList = ({ results }) => {
  const { operating_hours, gps_coordinates } = results.local_results[0];

  // Función para formatear los horarios de operación
  const formatOperatingHours = (hours) => {
    return Object.keys(hours).map((day) => (
      <div key={day}>
        <strong>{day.charAt(0).toUpperCase() + day.slice(1)}:</strong> {hours[day]}
      </div>
    ));
  };

  // Función para construir la URL de Google Maps
  const buildGoogleMapsUrl = (latitude, longitude) => {
    return `https://www.google.com/maps?q=${latitude},${longitude}`;
  };

  return (
    <div className='card restaurant-List'>
      <div className='card-body'>
        <h5 className="card-title">{results.local_results[0].title}</h5>
        <a href={buildGoogleMapsUrl(gps_coordinates.latitude, gps_coordinates.longitude)} target="_blank" rel="noreferrer" className='bi-geo-alt-fill btn'>
          {results.local_results[0].address}
        </a>
        <p className='bi bi-telephone-fill'>{results.local_results[0].phone}</p>
        <p>
          <button
            className='btn'
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOperatingHours"
            aria-expanded="false"
            aria-controls='collapseOperatingHours'
          >
            {results.local_results[0].open_state}
          </button>
        </p>
        <div className='collapse' id="collapseOperatingHours">
          <div className='card card-body text-center'>
            {formatOperatingHours(operating_hours)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantList;

 *SEARCH BAR*******************
 
 
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
      </div>
      <div className='RestaurantList'>
      {results && (
        <RestaurantList results={results} />
      )} 
      </div>
    </div>
  );
};

export default SearchBar;

*/