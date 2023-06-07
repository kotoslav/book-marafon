const mongoose = require('mongoose');
const User = mongoose.model('User');
const Review = mongoose.model('Review');
const { validationResult } = require('express-validator');
const { checkAuth, hasPermission } = require('../utils/checkauth');


const sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.reviewsReadManyByUser =  async function(req, res) {
  try {

  const user = await User.findById(req.params.userid).exec();
  const stage = user.currentStage;

  if (!user) {
    sendJsonResponse(res, 404, {"message": "userid not found"});
  } else if (!stage) {
    sendJsonResponse(res, 404, {"message": "user does not participate"});
  } else if (! stage.reviews ){
    sendJsonResponse(res, 404, {"message": "reviews not found"});
  } else {
    return res.status(200).json(stage.reviews);
  }
  } catch(err) {
    sendJsonResponse(res, 400, {"message": "userid or reviewid not valid"});
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

  const user = await User.findById(req.params.userid).select("currentStage").exec();
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
  if (await checkAuth(req, res) && ( req.userId == req.params.userid || hasPermission(req, res)  )) {
    try {
        const user = await User.findById(req.params.userid).exec();
        const reviews = user.currentStage.reviews;
        const newReview = new Review({
          bookAuthor: req.body.bookAuthor,
          bookName: req.body.bookName,
          reviewText: req.body.reviewText,
          imgURL: req.body.imgURL
        });
        reviews.push(newReview);
        user.save();
        return res.status(200).json({"status" : "success"});
    } catch(err) {
        return res.status(500).json({error: "something wrong"});
    }

  } else {
    return res.status(500).json({error: "Has not permission"});
  }
};

module.exports.reviewsUpdateOne = async function(req, res) {
  if (await checkAuth(req, res) && ( req.userId == req.params.userid || hasPermission(req, res)  )) {
    try {

    } catch(err) {

    }

  } else {
    return res.status(500).json({error: "Has not permission"})
  }

  sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.reviewsDeleteOne = async function(req, res) {
  if (await checkAuth(req, res) && ( req.userId == req.params.userid || hasPermission(req, res)  ))  {
    try {

    } catch(err) {

    }

  } else {
    return res.status(500).json({error: "Has not permission"})
  }

  sendJsonResponse(res, 200, {"status" : "success"});
};
