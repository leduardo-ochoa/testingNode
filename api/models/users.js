const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    //Trim lo que hace es borrar los espacios en blanco de un string
    name: {
        type: String,
        required: true,  
        trim: true,  
      },  
      password: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        unique: true,
        required: true,  
        trim: true,  
      },
    country:{
        type: String,
        required: true,
        trim: true,
    },
    cellphone: {
      type: String,
      unique: true,
      required: true,
    },
    birthDate: {
      type: String,
      required: true,
    },
    address: {
      type: String,   
      required: true,  
      trim: true,  
    }
    });
    
    //Acá se crea el usuario con el schema previamente definido.
  var User = mongoose.model('User', UserSchema);
  module.exports = User;