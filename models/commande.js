const mongoose = require("mongoose");

const commandeSchema = new mongoose.Schema({
  id: {
    type: String,
    autoIncrement: true,
    primaryKey: true
},

name : {
    type : String,
    reuired : true
},
dateheure : {
    type :Date,
    required : true,
    
},
total : {
  type :Number,
  required : true,
  
},

});

module.exports = mongoose.model("Commande", commandeSchema);