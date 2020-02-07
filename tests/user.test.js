const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();
const app = require("../src/app");
const User = require("../src/models/user");
// const Task = require("../src/models/task");

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

// const userTwoId = new mongoose.Types.ObjectId();
// const userTwo = {
//   _id: userTwoId,
//   name: "Lois Lane",
//   email: "mslane@kryptic.com",
//   password: "l0islan3",
//   tokens: [
//     {
//       token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET_KEY)
//     }
//   ]
// };

// const taskOne = {
//   _id: new mongoose.Types.ObjectId();
//   description: 'First Task',
//   owner: userOne._id
// }

console.log(process.env.JWT_SECRET_KEY);

beforeAll(done => {
  require("../src/db/mongoose");
  done();
});

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
  // await new User(userTwo).save();
});

test("should sign up a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Wedekind",
      email: "sam@example.com",
      password: "sam234586"
    })
    .expect(201);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  expect(response.body).toMatchObject({
    user: {
      name: "Wedekind",
      email: "sam@example.com"
    },
    token: user.tokens[0].token
  });

  expect(user.password).not.toBe("sam234586");
});

test("should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password
    })
    .expect(200);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBe(null);
  expect(user.token).toEqual(response.body.token[1].token);
});

test("should not login nonexistent user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "mail@mail.com",
      password: "thief123"
    })
    .expect(400);
});

test("should get user profile", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should not get unauthenticated user profile", async () => {
  await request(app)
    .get("/users/me")
    .send()
    .expect(401);
});

test("should delete user account", async () => {
  const response = await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(response.body.user._id);
  expect(user).toBe(null);
});

test("should not delete unauthenticated user account", async () => {
  await request(app)
    .delete("/users/me")
    .send()
    .expect(401);
});

test("should upload user img", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/user-one.jpg")
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("should update valid user fields", async () => {
  const response = await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Kal-el",
      age: 32
    })
    .expect(200);
  expect(response.body.message).toBe("Updated Profile Successfully");

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBe(null);
  expect(user.name).toBe("Kal-el");
  expect(user.age).toBe(32);
});

test("should not update invalid user fields", async () => {
  const response = await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      power: "flight, superspeed"
    })
    .expect(400);
  expect(response.body.message).toBe(
    "Invalid, Valid fields are: name, age, password or email"
  );
});
