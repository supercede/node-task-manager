const express = require("express");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
require("./db/mongoose");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(3000, () => {
  console.log("connected on port " + port);
});
