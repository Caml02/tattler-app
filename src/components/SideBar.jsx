import React, { useState } from 'react';
import ModalContent from './ModalContent';
import axios from 'axios';

const SideBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  const handleUpdateRestaurants = (updatedRestaurants) => {
    setRestaurants(updatedRestaurants);
  };

  return (
    <div id='sideBar'>
      <nav id="sideBar" className='sidebar d-none d-lg-block'>
        <ul className='list-group'>
          <li>
            <button
              type="button"
              className="bi bi-box-arrow-down btn"
              data-bs-toggle="modal"
              data-bs-target="#modalFavorites"
              onClick={() => {
                setIsModalOpen(true);
                // Actualizar los restaurantes antes de abrir el modal
                axios
                  .get('http://localhost:3001/get-saved-restaurants')
                  .then(response => {
                    setRestaurants(response.data);
                  })
                  .catch(error => {
                    console.error('Error al obtener los restaurantes guardados:', error);
                  });
              }}
            >
              Guardados
            </button>
          </li>
          <li>
            <button
              type="button"
              className="bi bi-clock-history btn"
              data-bs-toggle="modal"
              data-bs-target="#modalRecientes"
            >
              Reciente
            </button>
          </li>
        </ul>
      </nav>

      {/* Modal de Recientes */}
      <div className="modal fade" id="modalRecientes" tabIndex="-1" aria-labelledby="modalRecientesLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <ModalContent modalType="recientes" />
        </div>
      </div>

      {/* Modal de Guardados */}
      <div className="modal fade" id="modalFavorites" tabIndex="-1" aria-labelledby="modalFavoritesLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <ModalContent modalType="guardados" isOpen={isModalOpen} restaurants={restaurants} onUpdateRestaurants={handleUpdateRestaurants} />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
