const express = require("express");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
require("./db/mongoose");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// const http = require('http');
// http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.send('Hello world');
// }).listen(8080);

app.listen(3000, () => {
  console.log("connected on port " + port);
});