require("dotenv").config();
require("./db/mongoose");
const app = require("./app");

const port =
  process.env.NODE_ENV === "test" ? process.env.TEST_PORT : process.env.PORT;

app.listen(port, () => {
  console.log("connected on port " + port);
});
