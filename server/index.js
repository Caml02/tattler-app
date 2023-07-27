const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const googleSearch = require('./GoogleSearchApi');

app.use(cors());
app.use(express.json()); // Para analizar el cuerpo de las solicitudes en formato JSON


// Conexión a la base de datos de MongoDB Atlas
mongoose.connect('mongodb+srv://TechGhostW:BlancN13@cluster0.b8y8yrh.mongodb.net/tattler-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conexión exitosa a MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB Atlas:', error);
  });

app.get('/search', async (req, res) => {
  const { engine, q, latitude, longitude } = req.query;

  try {
    const results = await googleSearch(engine, q, latitude, longitude);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Rutas
const restaurantRoutes = require('./routes/restaurants');
app.use(restaurantRoutes);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
