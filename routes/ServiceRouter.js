const express = require("express");

const route = express.Router();

const ServiceController = require("../controllers/ServiceController");

route.post("/add-service", ServiceController.addService);
route.get("/getAllSerives", ServiceController.getAllServices);

module.exports = route;
