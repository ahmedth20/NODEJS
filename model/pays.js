const mongo = require("mongoose");
const Schema = mongo.Schema;

const PAYS = new Schema({
  name: String,
  capitale: String,
  code: Number,
});

module.exports = mongo.model("payscol", PAYS,'PayCollection');
