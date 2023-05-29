const mongoose = require('mongoose');
const User = mongoose.model('User');

const sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.usersReadOne =  function(req, res) {
  User.findById(req.params.userid).
  exec(function(err, user) {
    sendJsonResponse(res, 200, user);
  })
};

module.exports.usersCreate =  function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.usersUpdateOne =  function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};
