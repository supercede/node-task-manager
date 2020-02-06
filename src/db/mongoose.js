const mongoose = require("mongoose");

const db =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGO_URL
    : process.env.MONGO_URL;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log(`connected to db ${db}`);
  });
