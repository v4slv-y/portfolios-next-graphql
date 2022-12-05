const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  avatar: String,
  email: {
    type: String,
    required: "Email is required!",
    lowercase: true,
    index: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  },
  name: {
    type: String,
    minlength: [6, "Minimum name length is 6 characters!"],
  },
  username: {
    type: String,
    minlength: [6, "Minimum userName length is 6 characters!"],
  },
  password: {
    type: String,
    minlength: [6, "Minimum password length is 6 characters!"],
    maxlength: [30, "Maximum password length is 30 characters!"],
    required: true,
  },
  role: {
    enum: ["guest", "admin", "instructor"],
    type: String,
    required: true,
    default: "guest",
  },
  info: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", function (next) {
  // funkcyja zapuskajetsa pered funkcyjej v klass User
  const user = this; //sozdanije ekzempljara dannogo objekta

  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.validatePassword = function (candidatePassword, done) {
  bcrypt.compare(candidatePassword, this.password, function (err, isSuccess) {
    if (err) return done(err);
    done(null, isSuccess);
  });
};

module.exports = mongoose.model("User", userSchema);
