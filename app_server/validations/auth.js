const { check, validationResult } = require('express-validator')

const registerValidation = [
    check('firstName').notEmpty(),
    check('familyName').notEmpty(),
    check('nickName').notEmpty(),
    check('dateOfBirth').isDate(),
    check('email').trim().isEmail(),
    check('password').isStrongPassword({
        minLength: 5,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0
    }),
    check('liveLocation').notEmpty()
];


module.exports.registerValidation = registerValidation;
