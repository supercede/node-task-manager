require("dotenv").config();
const express = require("express");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
require("./db/mongoose");

const app = express();
port =
  process.env.NODE_ENV === "test" ? process.env.TEST_PORT : process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("connected on port " + port);
});
