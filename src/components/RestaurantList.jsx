import React, { useState } from 'react';
import axios from 'axios';
 

const RestaurantList = ({results, index}) => {
  const { operating_hours, gps_coordinates } = results.local_results[0];
  const [isFavorite, setIsFavorite] = useState(false);



  // Función para formatear los horarios de operación
  const formatOperatingHours = (hours) => {
    if (!hours) {
      return "Horario no disponible";
    }

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

    // Función para manejar el clic en el ícono de corazón

    const handleFavoriteClick = () => {
      console.log('isFavorite:', isFavorite);
      setIsFavorite(!isFavorite);
    
      // Extraer los datos relevantes del restaurante
      const { title, address, phone, open_state } = results.local_results[0];
      const restaurantData = {
        title,
        address,
        phone,
        open_state,
        isFavorite: !isFavorite, 
      };
      
      
      // Enviar los datos del restaurante al backend
      axios.post('http://localhost:3001/save-restaurant', restaurantData)
        .then((response) => {
          console.log('Restaurant saved:', response.data.restaurant);
          // Puedes agregar aquí una lógica para actualizar el estado o dar un mensaje de éxito
        })
        .catch((error) => {
          console.error('Error saving restaurant:', error);
          // Puedes agregar aquí una lógica para manejar errores
        });
    };
  

  return (
    <div className='card restaurant-List'>
      <div className='card-body text-center'>
        <i
          className={isFavorite ? "bi bi-heart-fill" : "bi bi-heart"}
          onClick={handleFavoriteClick}
        ></i>
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
            data-bs-target={`#collapseOperatingHours${index}`}
            aria-expanded="false"
            aria-controls={`collapseOperatingHours${index}`}
          >{results.local_results[0].open_state}
          </button>
        </p>
        <div className='collapse' id={`collapseOperatingHours${index}`}>
          <div className='card card-body'>
            {operating_hours ? formatOperatingHours(operating_hours) : "Horario no disponible"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantList;