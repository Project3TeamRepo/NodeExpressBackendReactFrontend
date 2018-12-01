var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var CalendarSchema = new Schema(
{
  eventName: {
    type: String,
    required: true,
    unique: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  eventInfo: {
    type: String,
    required: false
  },
  eventLocation: {
    type: String,
    required: false
  },
  eventUser: {
    type: Number,
    required: true
  }
},
  {
    timestamps: true
  }
);

// This creates our model from the above schema, using mongoose's model method
var Calendar = mongoose.model("Calendar", CalendarSchema);

// Export the Article model
module.exports = Calendar;
