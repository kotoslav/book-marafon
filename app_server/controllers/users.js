const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = mongoose.model('User');


const sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.usersReadOne =  async function(req, res) {
  try {
  const user = await User.findById(req.params.userid).exec();
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
  try {
    const {nickName, password} = req.body;
    //const isUsed = await User.findOne({nickName});

    sendJsonResponse(res, 200, req.body);
  } catch (err) {}


};

module.exports.usersLogin =  async function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.usersUpdateOne =  async function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};
