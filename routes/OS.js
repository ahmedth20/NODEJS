var express = require('express');
const { type } = require('express/lib/response');
var router = express.Router();

const os = require('os'); 

// Route de base : informations sur le serveur
router.get('/', (req, res) => {
  res.json({
    platform: os.platform(),
    hostname: os.hostname(),
    type: os.type()
  });
});

// Route pour afficher les processeurs
router.get('/cpus', (req, res) => {
  res.json(os.cpus());
});

// Route pour afficher les détails d'un processeur spécifique
router.get('/cpus/:id', (req, res) => {
  const cpus = os.cpus();
  const cpuId = parseInt(req.params.id, 10);

  if (cpuId >= 0 && cpuId < cpus.length) {
    res.json(cpus[cpuId]);
  } else {
    res.status(404).json({ error: "Processeur non trouvé" });
  }
});
module.exports = router;
