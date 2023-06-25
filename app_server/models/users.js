const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, maxLength: 100 },
    familyName: { type: String, required: true, maxLength: 100 },
    fatherName: { type: String, maxLength: 100 },
    nickName: {type: String, required: true, unique: true},
    dateOfBirth: { type: Date, required: true },
    email: { type: String, required: true, lowercase: true },
    passwordHash: {type: String, required: true},
    role: {type: String, default: "player"},
    stages: [{ type: mongoose.Schema.ObjectId, ref: 'Stage' }],
    liveLocation: {
        coord: [Number, Number],
        city: {type: String, required: true},
        region: String
    }
},
    {timestamps: true}
);


const UserModel = mongoose.model('User', userSchema);
