import React from 'react';

const ModalContent = ({ modalType }) => {
  return (
    
    <div className="modal-content">
        {modalType === 'recientes' ? (
          <>
          <div className='modal-content'>
            <div className="modal-header">
            <h5 className="modal-title">Tattler-App - Recientes</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className='modal-body'>
                <p>Contenido de la ventana modal de Recientes.</p>
                <p>Puedes agregar aquí todo el contenido específico para Recientes.</p>
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
                <div className='modal-body'>
                    <p>Contenido de la ventana modal de Guradados.</p>
                    <p>Puedes agregar aquí todo el contenido específico para Guradados.</p>
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
