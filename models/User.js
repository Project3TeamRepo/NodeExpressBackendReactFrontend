var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var UserSchema = new Schema(
{
  userName: {
    type: String,
    required: true,
    unique: true
  },
  userPassword: {
    type: String,
    required: false
  },
  userEmail: {
    type: String,
    required: true
  },
  userPhone: {
    type: String,
    required: false
  },
  userActive: {
    type: Number,
    required: true,
    default: 1
  }
},
  {
    timestamps: true
  }
);

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("User", UserSchema);

// Export the Article model
module.exports = User;
