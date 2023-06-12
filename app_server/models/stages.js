const mongoose = require('mongoose');

const stageSchema = new mongoose.Schema({
    start: Date,
    end: Date,
    target: Number,
    maxCountReviews: {type: Number, default: 100},
    groupName: String,
    minAge:  { type: Number, default: 0 },
    maxAge: { type: Number, default: 150 }
});


const StageModel = mongoose.model('Stage', stageSchema);
