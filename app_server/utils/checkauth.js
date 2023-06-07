const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.checkAuth = async (req, res) => {
    const token = (req.headers.authorization ?? '').replace(/Bearer\s?/, '');
    try {
        const decoded = jwt.verify(token, 'replaceIt');
        req.userId = decoded._id;
        return true;
    } catch {
        return false;
    }
}

module.exports.hasPermission = async (req, res) => {
    if (req.userId) {
        const { role } = await User.findById(req.userId);
        console.log(role);
        return req.params.userid === req.userId
        || role == "admin" || role == "moderator";
    } else {
        return false;
    }
}
