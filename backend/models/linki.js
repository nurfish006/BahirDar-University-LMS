const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Linki = mongoose.model('LinkEe', linkSchema);

module.exports = Linki;