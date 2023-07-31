const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  title: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: false },
  open_state: { type: String, default: "Horario no disponible" },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
