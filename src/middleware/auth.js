const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split(" ")[1];
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);

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
      .send({ error: "You are not authorized to do this" });
  }
};

module.exports = auth;
