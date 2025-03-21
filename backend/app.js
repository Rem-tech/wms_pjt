const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB sans Mongoose
let db;

MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('MongoDB connecté');
    db = client.db(); // Accès à la base de données
  })
  .catch(err => console.error('Erreur MongoDB:', err));

// Importation des routes
const toolRoutes = require('./routes/tools');
const requestRoutes = require('./routes/requests');
app.use('/api/tools', toolRoutes(db)); // Passage de la connexion DB aux routes
app.use('/api/requests', requestRoutes(db));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend démarré sur le port ${port}`);
});
