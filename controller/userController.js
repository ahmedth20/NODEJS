const User = require('../model/user'); // Ensure this is your mongoose model




// Ajouter un utilisateur
const createUser = async (req, res) => {
    try {
      console.log("Corps de la requête reçu :", req.body); // Log pour vérifier les données reçues
      const { name, email, cin } = req.body;
      const newUser = new User({ name, email, cin });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(400).json({ message: "Erreur lors de la création de l'utilisateur", error: err });
    }
  };
  

// Récupérer tous les utilisateurs
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs", error: err });
  }
};

// Récupérer un utilisateur par ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur", error: err });
  }
};

// Mettre à jour un utilisateur
const updateUserById = async (req, res) => {
  try {
    const { name, email, cin } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, cin },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de la mise à jour de l'utilisateur", error: err });
  }
};

// Supprimer un utilisateur
const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json({ message: "Utilisateur supprimé avec succès", user: deletedUser });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur", error: err });
  }
};

// Exporter toutes les fonctions
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};