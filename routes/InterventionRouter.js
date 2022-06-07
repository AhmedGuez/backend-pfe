const express = require("express");

const route = express.Router();

const InterController = require("../controllers/InterventionController");
const isauth = require("../middlewares/isauth");

route.get("/all", isauth, InterController.allInterventions);
route.post("/add-intervention", isauth, InterController.addIntervention);
route.put("/update/:id", isauth, InterController.updateIntervention);
route.get("/id/:id", isauth, InterController.getInterventionById);

module.exports = route;
