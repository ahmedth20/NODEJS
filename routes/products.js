var express = require('express');
var router = express.Router();

const fs = require('fs');
const path = require('path');
const validate = require("../middleware/validate");

// Chargement des produits
const productsPath = path.join(__dirname, '../products.json');
let products = {};
if (fs.existsSync(productsPath)) {
  products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
}

// Liste des produits (convertir l'objet en tableau)
router.get('/', (req, res) => {
  res.json(Object.keys(products).map(id => ({ id, ...products[id] })));
});

// Produits en stock avec quantité minimale
router.get('/instock/:qt', (req, res) => {
    const minStock = parseInt(req.params.qt, 10);
  
    if (isNaN(minStock)) {
      return res.status(400).json({ error: "La quantité minimale (qt) doit être un nombre valide." });
    }
  
    // Filtrer les produits directement dans l'objet
    const inStockProducts = {};
    for (const id in products) {
      if (products[id].stock >= minStock) {
        inStockProducts[id] = products[id];
      }
    }
  
    if (Object.keys(inStockProducts).length > 0) {
      res.json(inStockProducts);
    } else {
      res.status(404).json({ message: "Aucun produit ne correspond à ce critère de stock." });
    }
  });
  

  // Détails d'un produit
router.get('/:id', (req, res) => {
    const product = products[req.params.id.toUpperCase()]; // Recherche dans l'objet
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Produit non trouvé" });
    }
  });

  // Calcul du prix total
router.get('/:id/:qt', (req, res) => {
    const product = products[req.params.id.toUpperCase()]; // Recherche dans l'objet
    const quantity = parseInt(req.params.qt, 10);
  
    if (product) {
      const total = product.price * quantity;
      res.json({
        id: req.params.id.toUpperCase(),
        quantity,
        unitPrice: product.price,
        total,
      });
    } else {
      res.status(404).json({ error: "Produit non trouvé" });
    }
  });
module.exports = router;