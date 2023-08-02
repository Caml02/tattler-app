import React, { useState } from 'react';
import axios from 'axios';


const RatingModal = ({ modalType, restaurants }) => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const handleSaveRating = async () => {
    const ratingData = {
      restaurantId: restaurants._id,
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
  


  return (
    <div className="modal-ratings">
      { modalType === 'Rating' ? (
          <>
          <div className='modal-content'>
            <div className="modal-header">
            <h5 className="modal-title">Tattler-App - Califica tu restaurante</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className='modal-body'>
            <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handleRatingChange(star)}
                    className={star <= rating ? "star-icon filled" : "star-icon empty"}
                  >
                    {star <= rating ? <i className="bi bi-star-fill"></i> : <i className="bi bi-star"></i>}
                  </span>
                ))}
              </div>
              <textarea value={comments} onChange={handleCommentsChange} placeholder='Escribe aqui tus comentarios...'></textarea>
            </div>
            <div className="modal-footer">
              <button className='btn btn-primary' onClick={() => handleSaveRating(restaurants._id)}>Guardar calificación</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Omitir</button>
            </div>
          </div>
          </>
        ) : null }
    </div>
  );
};

export default RatingModal;
