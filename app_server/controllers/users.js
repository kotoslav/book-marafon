const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const { validationResult } = require('express-validator');
const { checkAuth, hasPermission } = require('../utils/checkauth');



const sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.usersReadOne =  async function(req, res) {
  try {


  const user = (await checkAuth(req, res) && await hasPermission(req, res))?
  await User.findById(req.params.userid).select("-passwordHash").exec() :
  await User.findById(req.params.userid)
  .select("firstName currentStage liveLocation.city liveLocation.region").exec();


  if (!user) {
    sendJsonResponse(res, 404, {"message": "userid not found"});
  } else {
    sendJsonResponse(res, 200, user);
  }
  } catch(err) {
    sendJsonResponse(res, 400, {"message": "userid not valid"});
    console.log(err);
  }
};

module.exports.usersRegister =  async function(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  };

  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const doc = new User({
    firstName: req.body.firstName,
    familyName: req.body.familyName,
    fatherName: req.body.fatherName,
    nickName: req.body.nickName,
    dateOfBirth: req.body.dateOfBirth,
    email: req.body.email,
    passwordHash: hash,
    liveLocation: req.body.liveLocation
  });

  try {
    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'replaceIt',
      {
        expiresIn: '30d'
      }
    );

    const {passwordHash, ...userData} = user._doc;

    res.status(201).json( {...userData, token});
  } catch (err) {
    if (err.code == 11000) {
      res.status(500).json({
        error: "this nickname is already in the database"
      });
    } else {
      res.status(500).json(err);
    };
  }
};

module.exports.usersLogin =  async function(req, res) {
  try {
    const user = await User.findOne({nickName: req.body.nickName});

    if (!user) {
      return res.status(404).json({message: "Incorrect password or username"});
    };

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);


    if (!isValidPass) {
      return res.status(400).json(
        {
        message: "Incorrect password or username"
        })
    };

      const token = jwt.sign(
      {
        _id: user._id,
      },
      'replaceIt',
      {
        expiresIn: '30d'
      }
    );

    const {passwordHash, ...userData} = user._doc;

    return res.status(200).json( {...userData, token});

  } catch (err) {
    res.status(500).json("Не удалось авторизоваться");
  }
};

module.exports.usersUpdateOne =  async function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};
