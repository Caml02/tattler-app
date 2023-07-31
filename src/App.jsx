import React from 'react';
import { RestaurantProvider } from './context/RestaurantContext';
import SideBar from './components/SideBar';
import SearchBar from './components/SearchBar';
import NavBar from './components/NavBar';
import Map from './components/Map';
import './scss/App.scss';

function App() {
  return (
    <RestaurantProvider> 
      <div>
        <NavBar />
        <div className="main">
          <div className="sidebar-wrapper">
            <SideBar />
          </div>
          <div className="searchbar-wrapper">
            <SearchBar />
          </div>
          <div className="map-wrapper">
            <Map />
          </div>
        </div>
      </div>
    </RestaurantProvider> 
  );
}

export default App;
