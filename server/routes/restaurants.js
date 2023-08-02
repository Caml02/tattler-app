const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

// Ruta para guardar el restaurante
router.post('/save-restaurant', async (req, res) => {
  const { title, address, phone, open_state, isFavorite } = req.body;
  console.log('Received restaurant data:', req.body);

  try {
    const newRestaurant = new Restaurant({
      title,
      address,
      phone,
      open_state: open_state || "Horario no disponible",
      isFavorite,
    });

    await newRestaurant.save();
    console.log('Restaurant saved:', newRestaurant);
    res.status(201).json({ restaurant: newRestaurant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar el restaurante en la base de datos' });
  }
});

router.post('/save-rating', async (req, res) => {
  const { restaurantId, rating, comments } = req.body;
  console.log('Received rating data:', req.body);

  try {
    // Buscar el restaurante por su ID
    const restaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { rating, comments },
      { new: true } // Esta opción hace que Mongoose devuelva el documento actualizado en lugar del documento original
    );

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurante no encontrado' });
    }

    console.log('Rating saved for restaurant:', restaurant);
    res.status(201).json({ rating: restaurant.rating, comments: restaurant.comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar la calificación y comentarios del restaurante' });
  }
});

router.get('/get-saved-restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find(); 
    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los restaurantes guardados' });
  }
});


  router.post('/delete-restaurant', async (req, res) => {
    const { restaurantId } = req.body; // Aquí esperamos recibir el ID del restaurante a eliminar

    try {
      const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);
      if (!deletedRestaurant) {
        return res.status(404).json({ error: 'Restaurante no encontrado' });
      }

      // Obtener la lista actualizada de restaurantes después de eliminar uno
      const updatedRestaurants = await Restaurant.find();
      res.json({ message: 'Restaurante eliminado exitosamente', restaurants: updatedRestaurants });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el restaurante' });
    }
  });


module.exports = router;
