const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  title: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: false },
  open_state: { type: String, default: "Horario no disponible" },
  rating: { type: Number, default: 0 }, 
  comments: { type: String, default: "" },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
