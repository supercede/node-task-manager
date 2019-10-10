const express = require("express");
const multer = require('multer');
const sharp = require('sharp');
const User = require("../models/user");
const auth = require("../middleware/auth");
const { welcomeMail, farewellMail } = require('../emails/account');

const router = express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    const token = await user.generateToken();
    await user.save();
    welcomeMail(user.email, user.name);
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findUserByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateToken();
    return res.json({ user, token });
  } catch (err) {
    res.status(400).send("Unable to login");
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      token => token.token !== req.token
    );
    await req.user.save();
    res.status(200).send("Done");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send(req.user);
  } catch (err) {
    res.send(err);
  }
});

router.get("/users/me", auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(500).send('You need to be logged in to perform this operation');
  }
});

router.patch("/users/me", auth, async (req, res) => {
  const allowedParams = Object.keys(User.schema.obj);
  const givenParams = Object.keys(req.body);
  let isAllowed = givenParams.every(param => allowedParams.includes(param));

  if (!isAllowed) {
    return res
      .status(400)
      .send("Invalid, Valid fields are: name, age, password or email");
  }

  try {
    const user = req.user;

    givenParams.forEach(param => (user[param] = req.body[param]));

    await user.save();
    res.send({ message: "Updated Profile Successfully", user });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    farewellMail(req.user.email, req.user.name);
    res.send({ message: "User Deleted", user: req.user });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const avatar = multer({
  // dest: 'avatars',
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb){
    if(!file.originalname.match(/\.(jpg|png|jpeg)$/)){
      return cb(new Error('Please upload an image'));
    }
    
    cb(undefined, true);
  }
})

router.post("/users/me/avatar", auth, avatar.single('avatar'), async (req, res) => {  
  if( req.file == undefined){
      return res.status(400).send('Please upload an image');
  }
  
  const buffer = await sharp(req.file.buffer).png().resize({ width: 250, height: 250 }).toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.status(200).send('file uploaded');
}, (err, req, res, next) => {
  res.status(400).send(err.message);
})

router.delete("/users/me/avatar", auth, async(req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  return res.status(200).send(req.user);
})

router.get('/users/:id/avatar', async(req, res) => {
  const id = req.params.id;
  try{
    const user = await User.findById(id);

    if(!user || !user.avatar){
      throw new Error('Image does not exist');
    }

    res.setHeader('Content-Type', 'image/png');
    res.status(200).send(user.avatar)
  }catch(err){
    res.status(400).send(err.message);
  }
})


module.exports = router;
