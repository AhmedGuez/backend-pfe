const Commande = require("../models/commande");

module.exports = {
  createCommande: async (req, res) => {
    const { produit, prix, quantite, fournisseurId } = req.body;

    if (!produit || !prix || !quantite || !fournisseurId) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    try {
      let newOrder;
      if (req.body.interventionId) {
        newOrder = new Commande({
          produit,
          prix,
          quantite,
          fournisseurId,
          interventionId: req.body.interventionId,
        });
      } else {
        newOrder = new Commande({
          produit,
          prix,
          quantite,
          fournisseurId,
        });
      }

      const savedOrder = await newOrder.save();

      if (!savedOrder) throw Error("Something went wrong saving the order");

      /* const token = jwt.sign({ id: savedOrder._id }, JWT_SECRET, {
        expiresIn: 3600,
      }); */

      res.status(200).json({
        message: "order successfuly registred",
        order: savedOrder,
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  updateStatus: (req, res) => {
    if (!req.params.id) {
      res.status(400).json({
        message: "commande not found ",
        data: null,
      });
    }
    Commande.findByIdAndUpdate(
      { _id: req.params.id },
      {
        status: req.body.status,
      },
      (err, order) => {
        if (!order) {
          res.status(500).json({
            message: "order not found ",
            data: null,
          });
        } else {
          res.status(200).json({
            message: "order updated successfuly",
          });
        }
      }
    );
  },

  orderToIntervention: (req, res) => {
    if (!req.params.id) {
      res.status(400).json({
        message: "commande not found ",
        data: null,
      });
    }
    Commande.findByIdAndUpdate(
      { _id: req.params.id },
      {
        interventionId: req.body.interventionId,
      },
      (err, order) => {
        if (!order) {
          res.status(500).json({
            message: "order not found ",
            data: null,
          });
        } else {
          res.status(200).json({
            message: "order found ",
            data: order,
          });
        }
      }
    );
  },

  deleteOrder: (req, res) => {
    Commande.findByIdAndDelete({ _id: req.params.id }, (err, user) => {
      if (err) {
        res.status(500).json({
          message: "Order not deleted ",
          data: null,
          status: 500,
        });
      } else {
        res.status(200).json({
          message: "Order deletd successfuly ",
          data: null,
          status: 200,
        });
      }
    });
  },

  getAllCommande: (req, res) => {
    Commande.find({}, (err, orders) => {
      if (orders.length <= 0) {
        res.status(500).json({
          message: "no orders in system ",
          data: null,
        });
      } else {
        res.status(200).json({
          message: "orders in system ",
          data: orders,
        });
      }
    });
  },

  getAllCommandebyIntervention: (req, res) => {
    Commande.find({ interventionId: req.params.id }, (err, orders) => {
      if (orders.length <= 0) {
        res.status(500).json({
          message: "no orders in system ",
          data: null,
        });
      } else {
        res.status(200).json({
          message: "orders in system ",
          data: orders,
        });
      }
    });
  },
};
