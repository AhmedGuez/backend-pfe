const Service = require("../models/service");

const addService = (req, res) => {
  const { name, email, tel } = req.body;

  if (!name || !email || !tel) {
    res.status(400).json({
      message: "name , email and tel is required!",
    });
  }

  try {
    const newService = new Service({
      name: name,
      email: email,
      tel: tel,
    });
    newService.save().then(() => {
      res.status(200).json({
        message: "Service added!",
      });
    }); // yestanna serivce lin yetsajel
  } catch (err) {
    res.status(500).json({
      message: "name , email and tel is required!",
    });
  }
};

const deleteService = async (req, res) => {
  if (req.params.id) {
    let id = req.params.id;
    try {
      await Service.findByIdAndDelete({ _id: id });
      res.status(200).json({
        message: "Service deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        message: "Error collection!",
      });
    }
  } else {
    res.status(400).json({
      message: "ID is required!",
    });
  }
};

const getAllServices = (req, res) => {
  Service.find({}, (err, services) => {
    if (services.length <= 0) {
      res.status(500).json({
        message: "no services in system ",
        data: null,
      });
    } else {
      res.status(200).json({
        message: "services in system ",
        data: services,
      });
    }
  });
};

module.exports = { addService, getAllServices, deleteService };
