const mongoose = require('mongoose');
const User = mongoose.model('User');

const sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.reviewsReadMany =  async function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.reviewsReadOne =  async function(req, res) {
  try {
  const user = await User.findOne().exec();
  const review = user.currentStage.reviews.id(req.params.reviewid)
  if (!user) {
    sendJsonResponse(res, 404, {"message": "userid not found"});
  } else {
    sendJsonResponse(res, 200, review);
  }
  } catch(err) {
    sendJsonResponse(res, 400, {"message": "userid invalid"});
    console.log(err);
  }
};

module.exports.reviewsCreate = async function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.reviewsUpdateOne = async function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.reviewsDeleteOne = async function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};
