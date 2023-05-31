const mongoose = require('mongoose');

const ratingShema = new mongoose.Schema({
   points: Number,
   emoji: String,
   createdAt: Date,
   moderator: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

const reviewSchema = new mongoose.Schema({
    bookAuthor: String,
    bookName: String,
    reviewText: String,
    createdAt: Date,
    updatedAt: Date,
    rating: ratingShema
});

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

/*

let model = new UserModel(

  {
    firstName: 'Вячеслав',
    familyName: 'Сыромятников',
    nickName: 'slava',
    dateOfBirth: new Date("1995-02-12"),
    email: 'zalll007@yandex.ru',
    liveLocation: { coord: [0, 0], city: "Красноярск" },
    oldStages: [],
    currentStage: {
      target: 8,
      reviews: [
        { bookAuthor: 'pushkon', reviewText: 'ebat' },
        { bookAuthor: 'pushkon', reviewText: 'ebat' }
      ]
    }
  }
);

model.save();
*/
