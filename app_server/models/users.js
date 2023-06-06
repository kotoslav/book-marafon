const mongoose = require('mongoose');

const ratingShema = new mongoose.Schema({
   points: Number,
   emoji: String,
   moderator: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, {timestamps: true});

const reviewSchema = new mongoose.Schema({
    bookAuthor: String,
    bookName: String,
    reviewText: String,
    rating: ratingShema
}, {timestamps: true});

const oldStageSchema = new mongoose.Schema({
    start: Date,
    end: Date,
    position: Number,
    finished: Boolean,
    groupName: String,
    reviews: [reviewSchema]
});

const currentStageSchema = new mongoose.Schema({
    start: Date,
    end: Date,
    target: Number,
    groupName: String,
    reviews: [reviewSchema]
});

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, maxLength: 100 },
    familyName: { type: String, required: true, maxLength: 100 },
    fatherName: { type: String, maxLength: 100 },
    nickName: {type: String, required: true, unique: true},
    dateOfBirth: { type: Date, required: true },
    email: { type: String, required: true, lowercase: true },
    passwordHash: {type: String, required: true},
    role: {type: String, default: "player"},
    currentStage: currentStageSchema,
    oldStages: [oldStageSchema],
    liveLocation: {
        coord: [Number, Number],
        city: {type: String, required: true},
        region: String
    }
},
    {timestamps: true}
);


const UserModel = mongoose.model('User', userSchema);
const ReviewModel = mongoose.model('Review', reviewSchema);
