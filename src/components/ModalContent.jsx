import React, { useEffect, useState } from 'react';
import axios from 'axios';

  const ModalContent = ({ modalType, isOpen, restaurants, onUpdateRestaurants }) => {
    const [localRestaurants, setLocalRestaurants] = useState([]);
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState('');
  
     // Crear un estado para manejar la calificación y comentarios de cada restaurante
  const [restaurantsRating, setRestaurantsRating] = useState({});

  // Funciones para manejar la calificación y comentarios de un restaurante específico
  const handleRatingChange = (restaurantId, newRating) => {
    setRestaurantsRating((prevRating) => ({
      ...prevRating,
      [restaurantId]: { ...prevRating[restaurantId], rating: newRating },
    }));
  };

  const handleCommentsChange = (restaurantId, event) => {
    setRestaurantsRating((prevRating) => ({
      ...prevRating,
      [restaurantId]: { ...prevRating[restaurantId], comments: event.target.value },
    }));
  };

  const handleSaveRating = async (restaurantId) => {
    const { rating, comments } = restaurantsRating[restaurantId];
    const ratingData = {
      restaurantId,
      rating,
      comments,
    };

    try {
      // Enviar los datos de calificación y comentarios del restaurante al backend
      const response = await axios.post('http://localhost:3001/save-rating', ratingData);
      console.log('Rating saved:', response.data.rating);
      // Puedes agregar aquí una lógica para actualizar el estado o dar un mensaje de éxito
    } catch (error) {
      console.error('Error saving rating:', error);
      // Puedes agregar aquí una lógica para manejar errores
    }
  };
  

    // Función para obtener los restaurantes guardados
    const getSavedRestaurants = () => {
      axios
        .get('http://localhost:3001/get-saved-restaurants')
        .then(response => {
          setLocalRestaurants(response.data);
          onUpdateRestaurants(response.data); // Actualizar el estado de los restaurantes en SideBar
        })
        .catch(error => {
          console.error('Error al obtener los restaurantes guardados:', error);
        });
    };

    // Se ejecuta cada vez que modalType cambie o isOpen sea verdadero
    useEffect(() => {
      if (modalType === 'guardados' && isOpen) {
        getSavedRestaurants();
      }
    }, [modalType, isOpen]);


    const handleDeleteRestaurant = async (restaurantId) => {
    try {
      const response = await axios.post('http://localhost:3001/delete-restaurant', { restaurantId });
      console.log(response.data.message); 
      // Vuelve a cargar los restaurantes después de eliminar uno
      onUpdateRestaurants(response.data.restaurants); // <-- Extraer la lista actualizada de restaurantes
    } catch (error) {
      console.error('Error al eliminar el restaurante:', error);
    }
  };

      const getCoordinatesFromAddress = async (address) => {
          try {
            const apiKey = 'AIzaSyD399TsNsz-1pOdSKa9hILqTYUonK9T-m4';
            const encodedAddress = encodeURIComponent(address);
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`);
            const { results } = response.data;
            if (results.length > 0) {
              const { lat, lng } = results[0].geometry.location;
              return { latitude: lat, longitude: lng };
            } else {
              console.error('No se encontraron coordenadas para la dirección:', address);
              return null;
            }
          } catch (error) {
            console.error('Error al obtener coordenadas:', error);
            return null;
          }
        };
        
  return (
    
    <div className="modal-content-tabs">
        {modalType === 'recientes' ? (
          <>
          <div className='modal-content'>
            <div className="modal-header">
            <h5 className="modal-title">Tattler-App - Recientes</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className='modal-body'>
                <p>Contenido de la ventana modal de Recientes cuando este listo.</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
          </>
        ) : modalType === 'guardados' ? (
            <>
            <div className='modal-content'>
                <div className="modal-header">
                    <h5 className="modal-title">Tattler-App - Guradados</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div  className='modal-body'>
                    <ul className='list-group saved-list-group'>
                    {restaurants.map((restaurant, index) => (
                      <li key={index} className='list-group-item'>
                        <h6>{restaurant.title}</h6>
                        <p>{restaurant.address}</p>
                        <p>{restaurant.phone}</p>
                        <p>{restaurant.open_state}</p>
                        <div className="rating-stars">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              onClick={() => handleRatingChange(restaurant._id, star)}
                              className={star <= (restaurantsRating[restaurant._id]?.rating || 0) ? "star-icon filled" : "star-icon empty"}
                            >
                              {star <= (restaurantsRating[restaurant._id]?.rating || 0) ? <i className="bi bi-star-fill"></i> : <i className="bi bi-star"></i>}
                            </span>
                          ))}
                        </div>
                        <textarea
                          value={restaurantsRating[restaurant._id]?.comments || ''}
                          onChange={(event) => handleCommentsChange(restaurant._id, event)}
                          placeholder='Escribe aqui tus comentarios...'
                        ></textarea>{modalType === 'guardados' && (
                                <button
                                    className='bi-geo-alt-fill btn btn-success'
                                    onClick={async () => {
                                    const coordinates = await getCoordinatesFromAddress(restaurant.address);
                                    if (coordinates) {
                                        const googleMapsUrl = `https://www.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`;
                                        window.open(googleMapsUrl, '_blank');
                                    }
                                    }}
                                >
                                </button>
                            )}
                            {modalType === 'guardados' && (
                                <button
                                className='btn btn-danger '
                                onClick={() => handleDeleteRestaurant(restaurant._id)}
                                >
                                Eliminar
                                </button>
                            )}
                            <button className='btn btn-primary' onClick={() => handleSaveRating(restaurant._id)}>Guardar calificación</button>
                            </li>
                        ))}
                    </ul>  
                    
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
            </>
        ) : null}
    </div>
  );
};

export default ModalContent;
