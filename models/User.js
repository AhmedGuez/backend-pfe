const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    id: {
        type: String,
        autoIncrement: true,
        primaryKey: true
    },

    name : {
        type : String,
        reuired : true
    },
    email : {
        type :String,
        required : true,
        unique : true
    },
    password : {
        type : String ,
        required : true
    },
    role : {
        type : String,
        
        required : true
    },
    service :{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: false
    }
});

module.exports = mongoose.model("User", UserSchema);
