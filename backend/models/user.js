const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const { urlValidator } = require("../utils/regex");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: "Jacques Cousteau",
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: "Explorador",
    },
    avatar: {
      type: String,
      default:'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
      validate: {
        validator: (v) => urlValidator.test(v),
        message: (props) => `${props.value} no es una URL válida`,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => urlValidator.test(v),
        message: (props) => `${props.value} no es un correo válido`,
      }
    },
    password: {
      type: String,
      required: true,
      select: false,
    }
  },
  { versionKey: false }
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Correo o contraseña incorrecta'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Correo o contraseña incorrecta'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model("user", userSchema);
