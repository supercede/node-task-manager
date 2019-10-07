const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Task = require("./task");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("entry is not a valid email address");
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a valid number");
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    validate(value) {
      if (value.includes("password")) {
        throw new Error("Password not allowed");
      }
    }
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ],
  avatar: {
    type: Buffer
  }
}, {
  timestamps: true
});

//Foreign field is the propery name on the ref (Task) mdodel that will set up the relationship
//localField is the where the value in the foreign field is stored in the local model (userSchema)

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "user"
});

userSchema.methods.generateToken = async function() {
  const user = this;

  const token = jwt.sign({ _id: user._id.toString() }, "mykeygoeshere");

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.methods.toJSON = function() {
  const user = this;

  // const newUser = {
  //   name: user.name,
  //   email: user.email,
  //   age: user.age
  // };

  // return newUser;

  userObj = user.toObject();
  delete userObj.password;
  delete userObj.tokens;
  delete userObj.avatar;
  return userObj;
};

userSchema.statics.findUserByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to log in");
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    throw new Error("Password or Email incorrect");
  }

  return user;
};

//Hash Password if changed before saving;
userSchema.pre("save", async function(next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

//Delete Tasks associated with user when account is deleted;
userSchema.pre("remove", async function(next) {
  const user = this;
  await Task.deleteMany({ user: user._id });
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
