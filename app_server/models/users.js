const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    first_name: { type: String, required: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 },
    father_name: { type: String, maxLength: 100 },
    date_of_birth: { type: Date, required: true },
    email: { type: String, required: true },

});
