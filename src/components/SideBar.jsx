import React from 'react';
import ModalContent from './ModalContent';

const SideBar = () => {
  return (
    <div id='sideBar'>
      <nav id="sideBar" className='sidebar d-none d-lg-block'>
        <ul className='list-group'>
          <li>
            <button type="button" className="bi bi-box-arrow-down btn" data-bs-toggle="modal" data-bs-target="#modalFavorites">
              Guardados
            </button>
          </li>
          <li>
            <button type="button" className="bi bi-clock-history btn" data-bs-toggle="modal" data-bs-target="#modalRecientes">
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
          <ModalContent modalType="guardados" />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
