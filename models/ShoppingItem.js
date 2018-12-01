var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ShoppingItemSchema = new Schema(
{
  itemName: {
    type: String,
    required: true,
    unique: true
  },
  itemQuantity: {
    type: Number,
    required: true,
    default: 1
  },
  itemLocation: {
    type: String,
    required: false
  },
  itemStatus: {
    type: Number,
    required: true,
    default: 0
  },
  itemUser: {
    type: Number,
    required: true
  }
},
  {
    timestamps: true
  }
);

// This creates our model from the above schema, using mongoose's model method
var ShoppingItem = mongoose.model("ShoppingItem", ShoppingItemSchema);

// Export the Article model
module.exports = ShoppingItem;
