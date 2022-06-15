const express = require("express");

const route = express.Router();

const Ordercontroller = require("../controllers/CommandeController");
const isauth = require("../middlewares/isauth");

const isadmin = require("../middlewares/isAdmin");

//create product
route.post("/", isauth, Ordercontroller.createCommande);
route.get("/all", isauth, Ordercontroller.getAllCommande);
route.get("/:id", isauth, Ordercontroller.getAllCommandebyIntervention);
route.put("/:id", isauth, isadmin, Ordercontroller.updateStatus);
route.put("/intervention/:id", isauth, Ordercontroller.orderToIntervention);
route.delete("/:id", isauth, isadmin, Ordercontroller.deleteOrder);

module.exports = route;
