const { check, validationResult } = require('express-validator')

const reviewValidation = [
    check('bookAuthor').isString().notEmpty(),
    check('bookName').isString().notEmpty(),
    check('reviewText').isString().notEmpty(),
    check('imgURL').optional().isString()
];


module.exports. reviewValidation = reviewValidation;
