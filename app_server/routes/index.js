const express = require('express');
const router = express.Router();
const ctrlUsers = require('../controllers/users');
const ctrlReviews = require('../controllers/reviews');

const {registerValidation} = require('../validations/auth');

const homepageController = function(req, res) {
  res.render('index', { title: 'Express!' });
};

router.get('/', homepageController);

router.get('/users/:userid', ctrlUsers.usersReadOne);
router.post('/users/register', registerValidation, ctrlUsers.usersRegister);
router.post('/users/login', ctrlUsers.usersLogin);
router.put('/users/:userid', ctrlUsers.usersUpdateOne);

router.get('/reviews/:userid', ctrlReviews.reviewsReadManyByUser);
router.get('/reviews', ctrlReviews.reviewsReadMany);
router.get('/reviews/:userid/:reviewid', ctrlReviews.reviewsReadOne);
router.post('/reviews/:userid', ctrlReviews.reviewsCreate);
router.put('/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
router.delete('/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);



module.exports = router;
