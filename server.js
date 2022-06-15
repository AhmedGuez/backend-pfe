const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./config/database");
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

app.use(cors());
//child routes
const userrouter = require("./routes/UserRouter");
const serviceRouter = require("./routes/ServiceRouter");
const interRouter = require("./routes/InterventionRouter");
// const adminrourter =  require('./routes/AdminRouter')
// const clientrouter =  require('./routes/ClientRouter')
// const productrouter =  require('./routes/ProductRouter')
// const categoryrouter =  require('./routes/CtaegoryRouter')
const orderrouter = require("./routes/OrderRouter");

//parent routes
app.use("/users", userrouter);

app.use("/orders", orderrouter);
app.use("/services", serviceRouter);
app.use("/interventions", interRouter);
// app.use("/admins", adminrourter);
// app.use("/clients", clientrouter);
// app.use("/products", productrouter);
// app.use("/categories", categoryrouter);
// app.use("/orders", orderrouter);

app.get("/", (req, res) => {
  res.send("hello ahmed ");
});

app.get("/hello/:name", (req, res) => {
  res.send("hello" + req.params.name);
});

app.get("/getfile/:image", function (req, res) {
  res.sendFile(__dirname + "/uploads/" + req.params.image);
});

app.listen(5000, () => {
  console.log("server is runing on port 5000");
});
