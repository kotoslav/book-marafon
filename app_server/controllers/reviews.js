const mongoose = require('mongoose');
const User = mongoose.model('User');

const sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.reviewsReadManyByUser =  async function(req, res) {
  try {
  const user = await User
  .findById(req.params.userid)
  .select("currentStage")
  .exec();
  const reviews = user.currentStage.reviews;
  if (!user) {
    sendJsonResponse(res, 404, {"message": "userid not found"});
  } else if (!reviews) {
    sendJsonResponse(res, 404, {"message": "reviews not found"});
  } else {
    sendJsonResponse(res, 200, reviews);
  }
  } catch(err) {
    sendJsonResponse(res, 400, {"message": "userid or revievid not valid"});
    console.log(err);
  }
};

module.exports.reviewsReadMany =  async function(req, res) {
  try {
  const user = await User
  .find()
  .select("currentStage firstName")
  .exec();
  //const review = user.currentStage.reviews;
  if (!user) {
    sendJsonResponse(res, 404, {"message": "userid not found"});
  } else {
    sendJsonResponse(res, 200, user);
  }
  } catch(err) {
    sendJsonResponse(res, 400, {"message": "userid or revievid not valid"});
    console.log(err);
  }
};

module.exports.reviewsReadOne =  async function(req, res) {
  try {
  const user = await User
  .findById(req.params.userid)
  .select("currentStage")
  .exec();
  const review = user.currentStage.reviews.id(req.params.reviewid);
  if (!user) {
    sendJsonResponse(res, 404, {"message": "userid not found"});
  } else if (!review) {
    sendJsonResponse(res, 404, {"message": "reviewid not found"});
  } else {
    sendJsonResponse(res, 200, review);
  }
  } catch(err) {
    sendJsonResponse(res, 400, {"message": "userid or revievid not valid"});
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
