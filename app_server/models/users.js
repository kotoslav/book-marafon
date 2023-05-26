const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    firstName: { type: String, required: true, maxLength: 100 },
    familyName: { type: String, required: true, maxLength: 100 },
    fatherName: { type: String, maxLength: 100 },
    nickName: {type: String, required: true, unique: true},
    dateOfBirth: { type: Date, required: true },
    email: { type: String, required: true, lowercase: true },
    password: {type: String}, //some secuirity token ofc
    currentStage: {
        start: Date,
        end: Date,
        target: Number,
        groupName: String,
        reviews: [String] // bookAuthor, bookName, reviewText, createdAt, updatedAt, rating {points, emoji, createdAt, moderator{ name, id}}
    },
    oldStages: [String], //array of objects like currentStage
    liveLocation: {
        coord: [Number, Number],
        city: String,
        region: String
    },
    createdAt: Date,
    updatedAt: Date
});

usersSchema.pre('save', function(next) {
    const now = Date.now();

    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }

    next();
})

let UserModel = mongoose.model('User', usersSchema);



let model = new UserModel(
{
    firstName: "Вячеслав",
    familyName: "Сыромятников",
    dateOfBirth: new Date("1995-02-12"),
    email: 'zalll007@yandex.ru',
    nickName: "slava"
}
);

model.save();
