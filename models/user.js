var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    UserSchema = mongoose.Schema({
        email: {
            type: String,
            required: !0
        },
        mobile: {
            type: Number,
            required: !0
        },
        name: {
            type: String,
            required: !0
        },
        password: {
            type: String,
            required: !0
        },
        address: {
            type: Array,
            required: !1
        },
        rewardPoints: {
            type: String,
            required: !0
        }
    }),
    User = module.exports = mongoose.model('User', UserSchema);
module.exports.getUserById = function(a, b) {
    User.findById(a, b)
}, module.exports.getUserByEmail = function(a, b) {
    User.findOne({
        email: a
    }, b)
}, module.exports.getUserByMobile = function(a, b) {
    User.findOne({
        mobile: a
    }, b)
}, module.exports.addUser = function(a, b) {
    bcrypt.genSalt(10, function(c, d) {
        bcrypt.hash(a.password, d, function(e, f) {
            if (e) throw e;
            a.password = f, a.save(b)
        })
    })
}, module.exports.comparePassword = function(a, b, c) {
    bcrypt.compare(a, b, function(d, e) {
        c(null, e)
    })
};