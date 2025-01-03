const express = require("express");
const pays = require("../model/pays");


// la rcherche de tous les utilisateurs
async function getall(req, res) {
  try {   
    const data = await pays.find();
    res.send(data); 
  } catch (err) {
    res.send(err);
  }
}

// la recherche par id
async function getbyid(req, res) {
  try {
    const data = await pays.findById(req.params.id);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
}

// l'ajout d'un utilisateur
async function add(req, res, next) {
  try {
  
    const Pays = new pays(req.body);
    await Pays.save();
    res.status(200).send("Pays ajouté avec success");
  } catch (err) {
    res.status(400).send({ error: error.toString() });
  }
}
module.exports = { getall, getbyid , add };


