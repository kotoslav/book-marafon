const mongoose = require('mongoose');
const User = mongoose.model('User');

const sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.reviewsReadMany =  function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.reviewsReadOne =  function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.reviewsCreate =  function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.reviewsUpdateOne =  function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.reviewsDeleteOne =  function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};
