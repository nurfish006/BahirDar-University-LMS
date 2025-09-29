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

const Linkc = mongoose.model('Linkce', linkSchema);

module.exports = Linkc;