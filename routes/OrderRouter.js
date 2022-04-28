const express = require("express");

const route = express.Router();

const Ordercontroller = require("../controllers/OrderController");
const isauth = require("../middlewares/isauth");

const isadmin = require("../middlewares/isAdmin");

//create product
route.post("/", isauth, Ordercontroller.createorder);
route.get("/client", isauth, Ordercontroller.getordersbyclientid);
route.get("/:id", isauth, Ordercontroller.getbyid);
route.get("/", isauth, isadmin, Ordercontroller.getall);
route.put("/:id", isauth, isadmin, Ordercontroller.update);
route.delete("/:id",isauth , isadmin, Ordercontroller.dateleorder);

module.exports = route;
