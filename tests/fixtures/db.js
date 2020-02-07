const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Clark Kent",
  email: "superman@kryptic.com",
  password: "manofSt33l",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET_KEY)
    }
  ]
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "Bruce Wayne",
  email: "bruce@gothamhq.com",
  password: "mymumismartha",
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET_KEY)
    }
  ]
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "Stop Braniac",
  completed: false,
  user: userOne._id
};

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "find time for Lois",
  completed: true,
  user: userOne._id
};

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "Rendevouz with Carmine Falcon",
  completed: true,
  user: userTwo._id
};

const setupDB = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

module.exports = {
  userOneId,
  userOne,
  setupDB,
  taskOne,
  userTwo
};
