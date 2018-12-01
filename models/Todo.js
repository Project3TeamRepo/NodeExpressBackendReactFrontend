var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var TodoSchema = new Schema(
{
  todoName: {
    type: String,
    required: true,
    unique: true
  },
  todoDate: {
    type: Date,
    required: true
  },
  todoInfo: {
    type: String,
    required: false
  },
  todoStatus: {
    type: Number,
    required: true,
    default: 0
  },
  todoUser: {
    type: Number,
    required: true
  }
},
  {
    timestamps: true
  }
);

// This creates our model from the above schema, using mongoose's model method
var Todo = mongoose.model("Todo", TodoSchema);

// Export the Article model
module.exports = Todo;
