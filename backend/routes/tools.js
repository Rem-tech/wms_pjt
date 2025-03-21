const express = require('express');
const router = express.Router();

module.exports = function(db) {
  // Récupérer tous les outils
  router.get('/', async (req, res) => {
    try {
      const tools = await db.collection('tools').find().toArray();
      res.json(tools);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // Ajouter un nouvel outil
  router.post('/', async (req, res) => {
    const { name, quantity, location, category } = req.body;
    const tool = { name, quantity, location, category };

    try {
      const result = await db.collection('tools').insertOne(tool);
      res.status(201).json(result.ops[0]);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  return router;
};
