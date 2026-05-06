const mongoose = require("mongoose");

const trailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  googlePlaceId: {
    type: String,
  },
  address: {
    type: String,
  },
}, { timestamps: true });

const Trail = mongoose.model("Trail", trailSchema);

module.exports = Trail;