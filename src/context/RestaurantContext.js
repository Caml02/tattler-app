import React, { createContext, useState } from 'react';

const RestaurantContext = createContext();

const RestaurantProvider = ({ children }) => {
  const [savedRestaurants, setSavedRestaurants] = useState([]);

  return (
    <RestaurantContext.Provider value={{ savedRestaurants, setSavedRestaurants }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export { RestaurantContext, RestaurantProvider };
