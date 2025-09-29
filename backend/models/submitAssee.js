const mongoose = require('mongoose');

const fileSchema = mongoose.Schema(
  {
    studname: {
      type: String,
      required: true,
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    file_path: {
      type: String,
      required: true
    },
    file_mimetype: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const EESASS = mongoose.model('eesubass', fileSchema);

module.exports = EESASS;
