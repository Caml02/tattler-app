const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const googleSearch = require('./GoogleSearchApi');
require("dotenv").config();

app.use(cors());
app.use(express.json()); // Para analizar el cuerpo de las solicitudes en formato JSON


// Conexión a la base de datos de MongoDB Atlas
  mongoose.connect(process.env.REACT_APP_MONGODB_URI, {
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
      const { engine, q, latitude, longitude, openStateFilter } = req.query;
    
      try {
        let results = await googleSearch(engine, q, latitude, longitude);
    
        // Filtrar los resultados según el filtro seleccionado
        if (openStateFilter === 'Abierto Ahora') {
          results.local_results = results.local_results.filter((result) => result.open_state && result.open_state.toLowerCase().includes('abierto'));
        } else if (openStateFilter === 'Abierto 24 horas') {
          results.local_results = results.local_results.filter((result) => result.open_state && result.open_state.toLowerCase().includes('abierto 24 horas'));
        }
    
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
