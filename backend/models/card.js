const mongoose = require('mongoose');
const { urlValidator } = require('../utils/regex');

const cardsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: (v) => urlValidator.test(v),
        message: 'The "link" field must be a valid URL',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
      default: [],
    },
    createdAt: {
      type: Date,
      default: () => Date.now(),
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('card', cardsSchema);