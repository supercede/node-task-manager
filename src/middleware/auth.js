const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split(" ")[1];
    const verified = jwt.verify(token, "mykeygoeshere");

    // console.log(verified);
    const user = await User.findOne({
      _id: verified._id,
      "tokens.token": token
    });

    if (!user) {
      throw new Error("Unauthorized");
    }

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    return res
      .status(401)
      .send({ error: "You are not permitted to do this: " + err.message });
  }
};

module.exports = auth;
