const request = require("supertest");
const app = require("../src/app");
const Task = require("../src/models/task");
const {
  userOne,
  userOneId,
  setupDB,
  taskOne,
  userTwo
} = require("./fixtures/db");

beforeAll(done => {
  require("../src/db/mongoose");
  done();
});

beforeAll(done => {
  require("../src/db/mongoose");
  done();
});

beforeEach(setupDB);
test("should create task for user", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: "Save the world"
    })
    .expect(201);

  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.description).toBe("Save the world");
  expect(task.completed).toBe(false);
});

test("should get all user tasks", async () => {
  const response = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(200);

  expect(response.body.length).toEqual(2);
});

test("should not delete task not created by user", async () => {
  const response = await request(app)
    .delete(`/tasts/${taskOne._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .expect(404);

  const task = await Task.findById(taskOne._id);
  expect(task).not.toBeNull();
});
