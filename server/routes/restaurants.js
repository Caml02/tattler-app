const express = require('express');
const router = express.Router();
const googleSearch = require('../GoogleSearchApi');
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

module.exports = router;
