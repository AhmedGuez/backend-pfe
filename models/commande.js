const mongoose = require("mongoose");

const commandeSchema = new mongoose.Schema({
  id: {
    type: String,
    autoIncrement: true,
    primaryKey: true,
  },
  produit: {
    type: String,
    reuired: true,
  },
  prix: {
    type: Number,
    reuired: true,
  },
  quantite: {
    type: Number,
    reuired: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
    required: false,
  },
  interventionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Intervention",
    default: null,
    required: false,
  },

  fournisseurId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Fournisseur",
    required: true,
  },

  status: {
    type: String,
    default: "EN_COURS",
    required: false,
  },
});

module.exports = mongoose.model("Commande", commandeSchema);
