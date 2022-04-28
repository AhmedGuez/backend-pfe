const express = require("express");

const route = express.Router();

const InterController = require("../controllers/InterventionController");
const isauth = require("../middlewares/isauth");


route.post('/add-intervention',isauth ,  InterController.addIntervention);
route.put('/update/:id',isauth ,  InterController.updateIntervention);

module.exports = route