const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title: String,
    notificationText: String,
    type: String
})

const NotificationModel = mongoose.model('notification', notificationSchema);
