const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  symptoms: {
    type: String,
    required: true
  },
  possible_conditions: {
    type: [String],
    default: []
  },
  severity: {
    type: String,
    default: "Low"
  },
  recommendation: {
    type: String,
    default: ""
  },
  warning_signs: {
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("History", historySchema);