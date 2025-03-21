const express = require('express');
const router = express.Router();

module.exports = function(db) {
  // Créer une demande pour un outil
  router.post('/', async (req, res) => {
    const { toolId, user } = req.body;

    try {
      const tool = await db.collection('tools').findOne({ _id: new require('mongodb').ObjectID(toolId) });
      if (!tool || tool.quantity <= 0) {
        return res.status(400).json({ message: 'Outil non disponible' });
      }

      const request = { toolId, user, status: 'pending' };
      const result = await db.collection('requests').insertOne(request);

      // Décrémenter la quantité de l'outil
      await db.collection('tools').updateOne(
        { _id: new require('mongodb').ObjectID(toolId) },
        { $inc: { quantity: -1 } }
      );

      res.status(201).json(result.ops[0]);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // Récupérer toutes les demandes
  router.get('/', async (req, res) => {
    try {
      const requests = await db.collection('requests').find().toArray();
      res.json(requests);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  return router;
};
