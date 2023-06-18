const express = require('express');
const router = express.Router();
const ctrlUsers = require('../controllers/users');
const ctrlReviews = require('../controllers/reviews');
const ctrlStages = require('../controllers/stages');

const { registerValidation } = require('../validations/auth');
const { reviewValidation } = require('../validations/review');


const homepageController = function(req, res) {
  res.render('index', { title: 'Express!' });
};

router.get('/', homepageController);

router.get('/users/:userid', ctrlUsers.usersReadOne);
//router.get('/users', ctrlUsers.usersReadOne);
router.post('/users/register', registerValidation, ctrlUsers.usersRegister);
router.post('/users/login', ctrlUsers.usersLogin);
router.put('/users/:userid', ctrlUsers.usersUpdateOne);
//router.put('/users', ctrlUsers.usersUpdateOne);
router.post('/users/:userid/register/:stageid', ctrlUsers.usersStageRegister);
//router.post('/users/register/:stageid', ctrlUsers.usersStageRegister);
router.put('/users/:userid/move/:stageid', ctrlUsers.usersStageMove);
//router.put('/users/move/:stageid', ctrlUsers.usersStageMove);
router.get('/table/:stageid', ctrlUsers.table); //users information with reviews titles and rating
router.get('/tableOld/:stageid', ctrlUsers.tableOldResults);

router.get('/reviews/:userid', ctrlReviews.reviewsReadManyByUser);
//router.get('/reviews', ctrlReviews.reviewsReadManyByUser);
router.get('/review/:userid/:reviewid', ctrlReviews.reviewReadOne);
router.get('/review/:reviewid', ctrlReviews.reviewReadOne);
router.get('/reviews/oldstages/:userid/:stageid',ctrlReviews.oldStageReviewsReadManyByUser);
router.post('/reviews/:userid', reviewValidation, ctrlReviews.reviewsCreate);
//router.post('/reviews', reviewValidation, ctrlReviews.reviewsCreate);
//router.put('/reviews/:reviewid', reviewValidation, ctrlReviews.reviewsUpdateOne);
router.put('/reviews/:userid/:reviewid', reviewValidation, ctrlReviews.reviewsUpdateOne);
//router.delete('/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);
router.delete('/reviews/:userid/:reviewid', ctrlReviews.reviewsDeleteOne);
router.get('/moderator/:stageid', ctrlReviews.moderate); //all not modarated reviews from selected stage


router.get('/stages/active', ctrlStages.stagesReadManyActive);
router.get('/stages', ctrlStages.stagesReadMany);
router.get('/stages/:stageid', ctrlStages.stagesReadOne);
router.post('/stages', ctrlStages.stagesCreate);
router.put('/stages/:stageid', ctrlStages.stagesUpdateOne);
router.delete('/stages/:stageid', ctrlStages.stagesDelete);

/*
router.get('/avatars', ctrlAvatars.avatarsReadMany);
router.post('/avatars', ctrlAvatars.avatarsCreate);
router.delete('/avatars/:avatarid', ctrlAvatars.avatarDeleteOne);

router.get('/notifications', ctrlNotifications.notificationsReadMany);


*/


module.exports = router;
