// Lista de restaurantes favoritos (inicialmente vacía)
let favoriteRestaurants = [];

// Función para agregar un restaurante a la lista de favoritos
export const addToFavorites = (restaurant) => {
  // Verificar si el restaurante ya está en la lista de favoritos
  if (!favoriteRestaurants.some((favRestaurant) => favRestaurant.id === restaurant.id)) {
    favoriteRestaurants = [...favoriteRestaurants, restaurant];
  }
};

// Función para eliminar un restaurante de la lista de favoritos
export const removeFromFavorites = (restaurantId) => {
  favoriteRestaurants = favoriteRestaurants.filter((favRestaurant) => favRestaurant.id !== restaurantId);
};

// Función para obtener la lista de restaurantes favoritos
export const getFavoriteRestaurants = () => {
  return favoriteRestaurants;
};
