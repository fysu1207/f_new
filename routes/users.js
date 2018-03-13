var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    config = require('../config/database'),
    User = require('../models/user'),
    Order = require('../models/order'),
    dateItem = require('../models/dateItem'),
    bcrypt = require('bcryptjs'),
    SendOtp = require('sendotp'),
    Razorpay = require('razorpay'),
    moment = require('moment');
    rzp = new Razorpay({
        key_id: ' rzp_live_qNI6V5maLBak44',
        key_secret: 'lM0HT7rLLHAIguyJIFv0jQ8y'
    });
router.post('/capture-payment', function(a, b) {
    console.log('reached'), payment_id = a.body.payment_id, rzp.payments.capture(payment_id, 1e3).then(function(d) {
        b.json({
            success: !0,
            msg: d
        })
    }).catch(function(d) {
        b.json({
            success: !1,
            msg: d
        })
    })
});
var sendOtp = new SendOtp('169485AwtkPnUOqshf598d9ce4', 'Your OTP for fysu.in is {{otp}}');
sendOtp.setOtpExpiry('1');
router.get('/send-otp/:mobile', function(a, b) {
    mobile = a.params.mobile;
    var d = '91' + mobile;
    sendOtp.send(d, 'FYSUBX', function(f, g) {
        f ? b.json({
            success: !1,
            msg: f
        }) : b.json({
            success: !0,
            msg: g
        })
    })
}), router.get('/retry-otp/:mobile', function(a, b) {
    var d = a.params.mobile;
    sendOtp.retry('91' + d, !1, function(g, h) {
        'success' == h.type ? b.json({
            success: !0,
            msg: h
        }) : b.json({
            success: !1,
            msg: h
        })
    })
}), router.post('/register', function(a, b) {
    mobile = a.body.mobile;
    var d = '91' + mobile;
    otp = a.body.otp;
    new User({
        email: a.body.email,
        mobile: a.body.mobile,
        name: a.body.name,
        password: a.body.password,
        address: a.body.address,
        rewardPoints: a.body.rewardPoints
    });
    sendOtp.verify(d, otp, function(g, h) {
        if ('success' == h.type) {
            var j = new User({
                email: a.body.email,
                mobile: a.body.mobile,
                name: a.body.name,
                password: a.body.password,
                address: a.body.address,
                rewardPoints: a.body.rewardPoints
            });
            User.addUser(j, function(k, l) {
                k ? b.json({
                    success: !1,
                    msg: 'Failed to Register'
                }) : b.json({
                    success: !0,
                    msg: l
                })
            })
        }
        'error' == h.type && b.json({
            success: !1,
            msg: h
        })
    })
}), router.post('/update-user', function(a, b) {
    id = a.body.id, email = a.body.email, mobile = a.body.mobile, name = a.body.name, User.findOneAndUpdate({
        _id: id
    }, {
        $set: {
            email: email,
            mobile: mobile,
            name: name
        }
    }).exec(function(d, f) {
        d ? b.json({
            success: !1,
            msg: d
        }) : b.json({
            success: !0,
            msg: f
        })
    })
}), router.post('/delete-address', function(a, b) {
    user_id = a.body.user_id, address = a.body.address, User.update({
        _id: user_id
    }, {
        $pullAll: {
            address: [address]
        }
    }).exec(function(d, f) {
        d ? b.json({
            success: !1,
            msg: d
        }) : f && b.json({
            success: !0,
            msg: f
        })
    })
}), router.post('/update-address', function(a, b) {
    user_id = a.body.user_id, address = a.body.original, pl_address = a.body.edited, User.update({
        _id: user_id
    }, {
        $pullAll: {
            address: [address]
        }
    }).exec(function(d, f) {
        d ? b.json({
            success: !1,
            msg: d
        }) : f && User.findOneAndUpdate({
            _id: user_id
        }, {
            $addToSet: {
                address: pl_address
            }
        }).exec(function(g, h) {
            g ? b.json({
                success: !1,
                msg: d
            }) : b.json({
                success: !0,
                msg: h
            })
        })
    })
}), router.post('/save-address', function(a, b) {
    user_id = a.body.user_id, address = a.body.address, User.find({
        _id: user_id
    }, function(d, f) {
        if (d && b.json({
                success: !1,
                msg: d
            }), f) {
            var g = f.address;
            null == g && User.findOneAndUpdate({
                _id: user_id
            }, {
                $addToSet: {
                    address: address
                }
            }).exec(function(h, i) {
                h ? b.json({
                    success: !1,
                    msg: h
                }) : b.json({
                    success: !0,
                    msg: i
                })
            })
        }
    })
}), router.post('/update-pwd', function(a, b) {
    user_id = a.body.u_id, password = a.body.password, newPassword = a.body.new_password, User.find({
        _id: user_id
    }, function(d, f) {
        f && User.comparePassword(password, f[0].password, function(g, h) {
            if (g) throw g;
            h ? bcrypt.genSalt(10, function(i, j) {
                bcrypt.hash(newPassword, j, function(k, l) {
                    if (k) throw k;
                    f[0].password = l, f[0].save(function(n, o) {
                        n ? b.json({
                            success: !1,
                            msg: n
                        }) : b.json({
                            success: !0,
                            msg: o
                        })
                    })
                })
            }) : b.json({
                success: !1,
                msg: 'Wrong Password'
            })
        })
    })
}), router.post('/update-pwd-home', function(a, b) {
    mob = a.body.mobile, otp = a.body.otp, password = a.body.newPwd;
    var d = '91' + mob;
    sendOtp.verify(d, otp, function(f, g) {
        'success' == g.type && User.find({
            mobile: mob
        }, function(i, j) {
            j && bcrypt.genSalt(10, function(k, l) {
                bcrypt.hash(password, l, function(n, o) {
                    if (n) throw n;
                    j[0].password = o, j[0].save(function(p, q) {
                        p ? b.json({
                            success: !1,
                            msg: p
                        }) : b.json({
                            success: !0,
                            msg: q
                        })
                    })
                })
            })
        }), 'error' == g.type && b.json({
            success: !1,
            msg: g
        })
    })
}), router.get('/find-email/:email', function(a, b) {
    e = a.params.email, User.find({
        email: e
    }, function(d, f) {
        f ? 0 < f.length ? b.json({
            success: !0,
            msg: 'User Found'
        }) : b.json({
            succcess: !1,
            msg: 'No user found'
        }) : b.json({
            succcess: !1,
            msg: 'No user found'
        })
    })
}), router.get('/get-mobile-from-email/:email', function(a, b) {
    e = a.params.email, User.find({
        email: e
    }, function(d, f) {
        f ? 0 < f.length ? b.json({
            success: !0,
            msg: f[0].mobile
        }) : b.json({
            succcess: !1,
            msg: 'No user found'
        }) : b.json({
            succcess: !1,
            msg: 'No user found'
        })
    })
}), router.get('/find-mobile/:mobile', function(a, b) {
    m = a.params.mobile, User.find({
        mobile: m
    }, function(d, f) {
        f ? 0 < f.length ? b.json({
            success: !0,
            msg: 'User Found'
        }) : b.json({
            succcess: !1,
            msg: 'No user found'
        }) : b.json({
            succcess: !1,
            msg: 'No user found'
        })
    })
}), router.post('/authenticate', function(a, b) {
    var d = a.body.email,
        f = a.body.password;
    /^\d{10}$/.test(d) ? User.getUserByMobile(d, function(g, h) {
        if (g) throw g;
        h || b.json({
            success: !1,
            msg: 'User not found'
        }), User.comparePassword(f, h.password, function(i, j) {
            if (i) throw i;
            if (j) {
                var k = jwt.sign({
                    data: h
                }, config.secret, {
                    expiresIn: 604800
                });
                b.json({
                    success: !0,
                    token: 'JWT ' + k,
                    user: {
                        id: h._id,
                        name: h.name,
                        username: h.username,
                        email: h.email,
                        mobile: h.mobile
                    }
                })
            } else b.json({
                success: !1,
                msg: 'Wrong Password'
            })
        })
    }) : User.getUserByEmail(d, function(g, h) {
        if (g) throw g;
        h || b.json({
            success: !1,
            msg: 'User not found'
        }), User.comparePassword(f, h.password, function(i, j) {
            if (i) throw i;
            if (j) {
                var k = jwt.sign({
                    data: h
                }, config.secret, {
                    expiresIn: 604800
                });
                b.json({
                    success: !0,
                    token: 'JWT ' + k,
                    user: {
                        id: h._id,
                        name: h.name,
                        username: h.username,
                        email: h.email,
                        mobile: h.mobile
                    }
                })
            } else b.json({
                success: !1,
                msg: 'Wrong Password'
            })
        })
    })
}), router.get('/get-address/:user_id', function(a, b) {
    id = a.params.user_id, User.find({
        _id: id
    }, function(d, f) {
        f ? 0 < f.length ? b.json({
            success: !0,
            msg: f
        }) : b.json({
            succcess: !1,
            msg: 'No user found'
        }) : b.json({
            succcess: !1,
            msg: 'No user found'
        })
    })
}), router.get('/get-user-rewards/:user_id', function(a, b) {
    id = a.params.user_id, User.find({
        _id: id
    }, function(d, f) {
        f ? 0 < f.length ? b.json({
            success: !0,
            msg: f[0].rewardPoints
        }) : b.json({
            succcess: !1,
            msg: 'No user found'
        }) : b.json({
            succcess: !1,
            msg: 'No user found'
        })
    })
}), router.post('/post-order', function(a, b) {
    // order = a.body.order_dets;
    let c = a.body;
    var d = new Order({
        order: {user_id: c.user_id,
            user_name:c.user_name,
            user_mobile:c.user_mobile,
            order_id:c.order_id,
            delivery_notes:c.delivery_notes,
            order_time: moment().format('MMMM Do YYYY, h:mm:ss a'),
            delivery_address:c.delivery_address,
            payment_method:c.payment_method,
            order:c.order,
            total_price:c.total_price,
            order: c.order}
    
    });
    d.save(function(f, g) {
        f ? b.json({
            success: !1,
            msg: f
        }) : b.json({
            success: !0,
            msg: g
        })
    })
}), router.post('/post-dateItem', function(a, b) {
    var d = a.body.dateItem,
        f = new d({
            dateItem: d
        });
    f.save(function(g, h) {
        g ? b.json({
            success: !1,
            msg: g
        }) : b.json({
            success: !0,
            msg: h
        })
    })
}), router.post('/get-dateItem', function(a, b) {
    var d = a.body.dateItem;
    d.find(function(f, g) {
        g ? b.json({
            success: !0,
            msg: g
        }) : f ? b.json({
            success: !1,
            msg: 'Something wrong'
        }) : b.json({
            success: !1,
            msg: f
        })
    })
}), router.get('/get-user-orders/:user_id', function(a, b) {
    user_id = a.params.user_id;
    var d = [];
    Order.find(function(f, g) {
        f ? b.json({
            success: !1,
            msg: f
        }) : (g.forEach(function(h) {
            h.order.user_id === user_id && d.push(h)
        }), b.json({
            success: !0,
            msg: d
        }))
    })
}), module.exports = router;