var express = require('express');
var router = express.Router();
const userController = require("../controller/userController");

/* 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
 */
router.post("/", userController.createUser); 
router.get("/", userController.getAllUsers); 
router.get("/:id", userController.getUserById); 
router.put("/:id",  userController.updateUserById); 
router.delete("/:id", userController.deleteUserById); 


module.exports = router;