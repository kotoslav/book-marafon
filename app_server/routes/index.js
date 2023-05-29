const express = require('express');
const router = express.Router();
const ctrlUsers = require('../controllers/users');
const ctrlReviews = require('../controllers/reviews');

const homepageController = function(req, res) {
  res.render('index', { title: 'Express!' });
};

router.get('/', homepageController);

router.get('/users/:userid', ctrlUsers.usersReadOne);
router.post('/users', ctrlUsers.usersCreate);
router.put('/users/:userid', ctrlUsers.usersUpdateOne);

router.get('/reviews', ctrlReviews.reviewsReadMany);
router.get('/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.post('/reviews', ctrlReviews.reviewsCreate);
router.put('/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
router.delete('/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);

module.exports = router;
