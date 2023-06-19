const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    bookAuthor: String,
    bookName: String,
    reviewAuthor: { type: mongoose.Schema.ObjectId, ref: 'User' },
    stageId: { type: mongoose.Schema.ObjectId, ref: 'Stage' },
    reviewText: String,
    imgURL: String,
    delete: {type: Boolean, default: false},
    rating: {
        points: {type: Number, default: 0},
        emojiURL: String,
        moderator: { type: mongoose.Schema.ObjectId, ref: 'User' }
    }
}, {timestamps: true});

const ReviewModel = mongoose.model('Review', reviewSchema);
