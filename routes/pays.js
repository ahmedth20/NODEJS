const express = require("express");
const router = express.Router();
const yup = require("yup");
const countryList = require("country-list");

// Utilisation de "MODEL" (M)
const pays = require("../model/pays");
// Appel du controller
const paysController = require("../controller/paysController");
// Utilisation de "Middleware" pour la validation
const validate = require("../middelware/validate");

// Route de test simple
router.get("/", (req, res) => {
  res.end("payssssss");
});

router.get("/test", (req, res) => {
  res.end("testpays");
});

// Route pour obtenir un pays par ID
router.get("/get/:id", paysController.getbyid);

// Fonction [READ] : obtenir tous les pays
router.get("/getall", paysController.getall);

// Fonction [CREATE] : Ajouter un nouveau pays (avec validation)

router.post("/new", async (req, res, next) => {
  // Validation du nom du pays
  const { name, code } = req.body;
  const countryNames = Object.values(countryList.getNames());  // Utilisation de getNames() pour obtenir la liste des pays
  
  // Normalisation de la casse et suppression des espaces
  const normalizedCountryName = name.trim().toLowerCase();

  const isValidCountry = countryNames.some(country => country.toLowerCase() === normalizedCountryName);

  if (!isValidCountry) {
    return res.status(400).json({
      error: "Le nom du pays est invalide. Veuillez saisir un nom de pays valide."
    });
  }

  // Validation du code : il ne doit pas être négatif
  if (code < 0) {
    return res.status(400).json({
      error: "Le code du pays ne peut pas être négatif."
    });
  }

  // Si toutes les validations passent, on passe à la validation générale
  next();
}, validate, paysController.add);  // Appel à la méthode d'ajout dans le contrôleur

// Fonction [UPDATE] : Modifier un pays par ID
router.put("/update/:id", async (req, res) => {
  try {
    const { code } = req.body;

    // Validation du code : il ne doit pas être négatif
    if (code < 0) {
      return res.status(400).json({
        error: "Le code du pays ne peut pas être négatif."
      });
    }

    const updatedPays = await pays.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPays) {
      return res.status(404).json({ error: "Pays introuvable pour la mise à jour" });
    }
    res.status(200).json(updatedPays);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Fonction [DELETE] : Supprimer un pays par ID
router.delete("/delete/:id", async function (req, res) {
  try {
    const deletedPays = await pays.findByIdAndDelete(req.params.id);
    if (!deletedPays) {
      return res.status(404).json({ error: "Pays introuvable pour la suppression" });
    }
    res.status(200).json({ message: "Pays supprimé avec succès", data: deletedPays });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
