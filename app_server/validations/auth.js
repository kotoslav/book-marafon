const { body } = require('express-validator');

const registerValidator = [
    body('firstName').notEmpty(),
    body('familyName').notEmpty(),
    body('fatherName').notEmpty(),
    body('nickName').notEmpty(),
    body('dateOfBirth').isDate(),
    body('email').trim().isEmail(),
    body('password').isStrongPassword(options:{
        minLength: 5
    }),
    body('liveLocation').notEmpty()
];
