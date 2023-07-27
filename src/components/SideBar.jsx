import React from 'react';

const SideBar = () => {
  return (
      <div id='sideBar'>
        <div
        className='offcanvas offcanvas-lg offcanvas-start'
        tabIndex="-1"
        id="offcanvasResponsive"
        aria-labelledby="offcanvasResponsiveLabel"
      ></div>   
      <nav id="sideBar" className='sidebar d-none d-lg-block'>
        <ul className='list-group'>
          <li>
            <a href="/" className='bi bi-box-arrow-down btn'>Guardados</a>
          </li>
          <li>
          <a href="/" className='bi bi-clock-history btn'>Reciente</a>
          </li>
        </ul>
      </nav>
      </div>
  );
};

export default SideBar;
