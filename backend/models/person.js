const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: String, required: true },
  avatar: { type: String, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  countryLagLat: { type: String, required: true },
  // creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true }
})

module.exports = mongoose.model('Person', personSchema);
