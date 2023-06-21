const mongoose = require('mongoose');
const User = mongoose.model('User');
const Review = mongoose.model('Review');

const { validationResult } = require('express-validator');
const { checkAuth, hasPermission } = require('../utils/checkauth');


module.exports.reviewsReadManyByUser =  async function(req, res) {
  try {
  await checkAuth(req, res);
  const userId = req.params.userid ?? req.userId;
  let reviews;
  if (await checkAuth(req, res) && ( req.userId == req.params.userid )) {
  if (req.role == "moderator" || req.role == "admin") {
  reviews = await Review.find({reviewAuthor: userId, stageId: req.params.stageid}).exec();
  } else {
  reviews = await Review.find({reviewAuthor: userId, stageId: req.params.stageid, 'rating.delete': false}).exec();
  };
  } else {
 reviews = await Review.find({reviewAuthor: userId, stageId: req.params.stageid, 'rating.delete': false, 'rating.moderator': {$exists: true}}).exec();
  }
  if (!reviews) {
    return res.status(404).json({"message": "user has not reviews in this stage"});
  }
  return res.status(200).json(reviews);

  } catch(err) {
    console.log(err);
    return res.status(400).json({"message": "userid not valid"});
  }
};

module.exports.reviewReadOne =  async function(req, res) {
  try {
    await checkAuth(req, res);
    const review = await Review.findById(req.params.reviewid).exec();

    if (!review) {
      return res.status(404).json({"message": "reviewid not found"});
    } else {
      if (req.role == "moderator" || req.role == "admin") {
        return res.status(200).json(review);
      } else {
        if (review.delete && !(req.role == "moderator" || req.role == "admin") ) {
          return res.status(404).json({error: "review was deleted"});
        } else if (!review.rating.moderator && !(req.role == "moderator" || req.role == "admin" || req.userId == review.reviewAuthor)) {
          return res.status(404).json({"message": "reviewid not found"});
        } else {
          return res.status(200).json(review);
        }
      }
    }
  } catch(err) {
    console.log(err);
    return res.status(400).json({"message": "revievid is not valid"});
  }
};

module.exports.reviewsCreate = async function(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  };
  if (await checkAuth(req, res) && ( await hasPermission(req, res) )) {
    try {
        const newReview = new Review({
          bookAuthor: req.body.bookAuthor,
          bookName: req.body.bookName,
          reviewText: req.body.reviewText,
          imgURL: req.body.imgURL,
          reviewAuthor: req.params.userid,
          stageId: req.params.stageid
        });
        newReview.save();
        return res.status(200).json({"status" : "success"});
    } catch(err) {
        return res.status(500).json({error: "something wrong"});
    }
  } else {
    return res.status(500).json({error: "Has not permission"});
  }
};

module.exports.reviewsUpdateOne = async function(req, res) {
  if (await checkAuth(req, res) && ( await hasPermission(req, res) )) {
    try {
      const review = Review.findById(req.params.reviewid);
      if (review.delete && !( req.role == "moderator" || req.role == "admin") ) {
        return res.status(404).json({error: "review was deleted"});
      };
      review.bookAuthor = req.body.bookAuthor ?? review.bookAuthor;
      review.bookName = req.body.bookName ?? review.bookName;
      review.reviewText = req.body.reviewText ?? review.reviewText;
      review.imgURL = req.body.imgURL ?? review.imgURL;
      if ( req.role == "moderator" || req.role == "admin") {
        review.delete = req.body.delete ?? review.delete;
      }
      if (( req.role == "moderator" || req.role == "admin") && req.body.rating) {
        review.rating = {
          points: req.body.rating.points,
          emojiURL: req.body.rating.emojiURL,
          moderator: req.userId
        };
      }
      await review.save();
      return res.status(201).json({status: "success"});
    } catch(err) {
      console.log(err);
      return res.status(500).json({error: "something wrong"});
    }
  } else {
    return res.status(500).json({error: "Has not permission"});
  }
};

module.exports.reviewsDeleteOne = async function(req, res) {
  if (await checkAuth(req, res) && ( await hasPermission(req, res) )) {
    try {
      const userId = req.params.userid ?? req.userId;
      const user = await User.findById(userId).select("currentStage").exec();
      const review = user.currentStage.reviews.id(req.params.reviewid);
      review.delete = true;
      await user.save();
      return res.status(201).json({status: "success"});
    } catch(err) {
      console.log(err);
      return res.status(500).json({error: "something wrong"});
    }
  } else {
    return res.status(500).json({error: "Has not permission"});
  }
};

module.exports.moderate = async function(req, res) {
    if (await checkAuth(req, res) && ( req.role == "admin" || req.role == "moderator" )) {
    try {
      const reviews = await Review.find({"rating.moderator": null, delete: false}).exec();
      return res.status(200).json(reviews);
    } catch(err) {
      console.log(err);
      return res.status(500).json({error: "something wrong"});
    }
  } else {
    return res.status(500).json({error: "Has not permission"});
  }
}
