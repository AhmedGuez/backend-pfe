const mongoose = require("mongoose");

const Intervention = new mongoose.Schema({
  id: {
    type: String,
    autoIncrement: true,
    primaryKey: true
},
  name: {
    type: String,
    reuired: true,
  },
  createdAt: {
    type: Date,
    default : Date.now()

  },
  dateDebut: {
    type: Date,
    default : Date.now(),
    reuired: false,
  },
  dateEnd: {
    type: Date,
    reuired: false,
  },
  description: {
    type: String,
    reuired: true,
  },
  lieu: {
    type: String,
    reuired: true,
  },
  delai: { 
    type: Date,
    reuired: true,
  },

  degree: { 
    type: String,
    reuired: true,
  },

  etat: { 
    type: String,
    reuired: false,
    default : 'NON_AFFECTEE'
  },

  createdBy :{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
    },

    affectedBy :{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false
      },

      affectedToUsers :[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
        }]

});

module.exports = mongoose.model("Intervention", Intervention);