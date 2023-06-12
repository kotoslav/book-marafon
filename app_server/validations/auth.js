const { check, validationResult } = require('express-validator')

const registerValidation = [
    check('firstName').isString().notEmpty(),
    check('familyName').isString().notEmpty(),
    check('nickName').isString().notEmpty(),
    check('dateOfBirth').isDate().notEmpty(),
    check('email').trim().isEmail().notEmpty(),
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
