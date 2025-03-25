const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  genre: { type: String, required: true },
  content: { type: String, required: true },
  constructiveScore: { type: Number, min: 0, max: 100 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);