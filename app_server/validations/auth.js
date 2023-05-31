const { check, validationResult } = require('express-validator')

const registerValidation = [
    check('firstName').notEmpty(),
    check('familyName').notEmpty(),
    check('nickName').notEmpty(),
    check('dateOfBirth').isDate(),
    check('email').trim().isEmail(),
    check('password').isStrongPassword({
        minLength: 5
    }),
    check('liveLocation').notEmpty()
];

exports.registerValidation;
