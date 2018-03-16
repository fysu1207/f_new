var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    config = require('../config/database'),
    bodyParser = require('body-parser'),
    user = require('../models/user.js'),
    item = require('../models/item.js'),
    dates = require('../models/dates.js'),
    Order = require('../models/order.js'),
    category = require('../models/category.js'),
    Admin = require('../models/admin'),
    TabStatus = require('../models/tabStatus'),
    moment = require('moment');
router.use(bodyParser.json()), router.use(bodyParser.urlencoded({
    extended: !1
})), router.post('/register', function(a, b) {
    var e = new Admin({
        adminname: a.body.adminname,
        password: a.body.password
    });
    Admin.addAdmin(e, function(f) {
        f ? b.json({
            success: !1,
            msg: 'Failed to Register'
        }) : b.json({
            success: !0,
            msg: 'Admin registered !'
        })
    })
}), router.post('/authenticate', function(a, b) {
    var e = a.body.adminname,
        f = a.body.password;
    Admin.getAdminByAdminname(e, function(g, h) {
        if (g) throw g;
        h ? Admin.comparePassword(f, h.password, function(j, k) {
            if (j && b.json({
                    success: !1,
                    msg: j
                }), k) {
                var l = jwt.sign({
                    data: h
                }, config.secret, {
                    expiresIn: 604800
                });
                b.json({
                    success: !0,
                    token: 'JWT ' + l,
                    admin: {
                        id: h._id
                    }
                })
            } else b.json({
                success: !1,
                msg: 'Wrong Password'
            })
        }) : b.json({
            success: !1,
            msg: 'Admin not found'
        })
    })
}), router.get('/get-admins', function(a, b) {
    Admin.find(function(e, f) {
        e ? b.json({
            success: !1,
            msg: e
        }) : b.json({
            success: !0,
            msg: f
        })
    })
}), router.delete('/delete-admin/:admin_id', function(a, b) {
    id = a.params.admin_id, Admin.deleteOne({
        _id: id
    }, function(e, f) {
        e ? b.json({
            success: !1,
            msg: e
        }) : b.json({
            success: !0,
            msg: f
        })
    })
}), router.post('/add-category', function(a, b) {
    var e = new category({
        name: a.body.name
    });
    e.save(function(f) {
        f ? b.json({
            msg: 'failed'
        }) : b.json({
            msg: 'success'
        })
    })
}), router.delete('/delete-category/:id', function(a, b) {
    category.remove({
        _id: a.params.id
    }, function(e) {
        e ? b.json('failed') : b.json('success')
    })
}), router.get('/get-categories', function(a, b) {
    category.find(function(e, f) {
        e ? b.json({
            success: !1,
            msg: e
        }) : b.json({
            success: !0,
            msg: f
        })
    })
}), router.get('/get-orders', function(a, b) {
    Order.find(function(e, f) {
        e ? b.json({
            success: !1,
            msg: e
        }) : b.json({
            success: !0,
            msg: f
        })
    })
}), router.get('/get-user-from-id/:user_id', function(a, b) {
    user_id = a.params.user_id, user.find({
        _id: user_id
    }, function(e, f) {
        return e ? void b.json({
            success: !1,
            msg: e
        }) : b.json({
            success: !0,
            msg: f
        })
    })
}), router.get('/get-user-from-id/:user_id', function(a, b) {
    user_id = a.params.user_id, user.find({
        _id: user_id
    }, function(e, f) {
        return e ? void b.json({
            success: !1,
            msg: e
        }) : b.json({
            success: !0,
            msg: f
        })
    })
}), router.get('/post-rewards/:email/:points', function(a, b) {
    mobile = a.params.email, points = a.params.points, user.find({
        mobile: mobile
    }, function(err, f) {
        if (err) b.json({
            success: false,
            msg: err
        });
        else {
            var g = isNaN(f[0].rewardPoints) ? 0 : f[0].rewardPoints;
            var h = parseInt(g) + parseInt(points),
                h = parseInt(h);
            user.findOneAndUpdate({
                mobile: mobile
            }, {
                $set: {
                    rewardPoints: h
                }
            }).exec(function(j, k) {
                j ? b.json({
                    success: !1,
                    msg: j
                }) : b.json({
                    success: !0,
                    msg: k
                })
            })
        }
    })
}); 
router.get('/rep-rewards/:mobile/:points', function(a, b) {
    mobile = a.params.mobile, points = a.params.points, user.find({
        mobile: mobile
    }, function(e, f) {
        if (e) b.json({
            success: !1,
            msg: e
        });
        else {
            isNaN(f[0].rewardPoints) ? 0 : f[0].rewardPoints;
            var h = parseInt(points),
                h = parseInt(h);
            user.findOneAndUpdate({
                mobile: mobile
            }, {
                $set: {
                    rewardPoints: h
                }
            }).exec(function(j, k) {
                j ? b.json({
                    success: !1,
                    msg: j
                }) : b.json({
                    success: !0,
                    msg: k
                })
            })
        }
    })
}), router.get('/get-user-orders/:user_id', function(a, b) {
    user_id = a.params.user_id, Order.find(function(e, f) {
        e ? b.json({
            success: !1,
            msg: e
        }) : b.json({
            success: !0,
            msg: f
        })
    })
}), router.post('/add-item', function(a, b) {
    cat_id = a.body.cat_id, sub_name = a.body.sub_name, item_name = a.body.item_name, item_price = a.body.item_price, item_img = a.body.item_img;
    var e = new item({
        cat_id: cat_id,
        sub_name: sub_name,
        item_name: item_name,
        item_price: item_price,
        item_img: item_img
    });
    e.save(function(f) {
        f ? b.json(f) : b.json({
            msg: 'success'
        })
    })
}), router.get('/get-items/:cat_id/:sub_name', function(a, b) {
    cat_id = a.params.cat_id, sub_name = a.params.sub_name, item.find({
        cat_id: cat_id,
        sub_name: sub_name
    }, function(e, f) {
        f ? b.json(f) : b.json('failed')
    })
}), router.get('/get-roti-items', function(a, b) {
    sub_name = 'Roti', item.find({
        sub_name: sub_name
    }, function(e, f) {
        f ? b.json({
            success: !0,
            msg: f
        }) : b.json({
            success: !1,
            msg: 'failed'
        })
    })
}), router.delete('/delete-item/:item_id', function(a, b) {
    id = a.params.item_id, item.remove({
        _id: id
    }, function(e, f) {
        e ? b.json({
            success: !1,
            msg: e
        }) : b.json({
            success: !0,
            msg: f
        })
    })
}), router.post('/add-sub-category', function(a, b) {
    category_id = a.body.category_id, sub_name = a.body.sub, category.find({
        _id: category_id
    }, function(e, f) {
        f ? (f[0].subs.push(sub_name), f[0].save(function(g, h) {
            h ? b.json({
                msg: 'success'
            }) : b.json({
                msg: 'failed'
            })
        })) : b.json({
            msg: 'failed'
        })
    })
}), router.get('/get-subs/:catId', function(a, b) {
    cat_id = a.params.catId, category.find({
        _id: cat_id
    }, function(e, f) {
        e ? b.json({
            msg: 'failed'
        }) : b.json(f[0].subs)
    })
}), router.delete('/delete-sub-category/:name/:cat_id', function(a, b) {
    cat_id = a.params.cat_id, sub_name = a.params.name, category.find({
        _id: cat_id
    }, function(e, f) {
        if (e) b.json({
            msg: 'failed'
        });
        else {
            var g = f[0].subs.indexOf(sub_name); - 1 < g && (f[0].subs = f[0].subs.filter(function(h) {
                return h != void 0
            }), f[0].subs.splice(g, 1), f[0].save(function(h, j) {
                j ? b.json({
                    msg: 'success'
                }) : b.json({
                    msg: 'failed'
                })
            }))
        }
    })
}), router.get('/get-date-items/:cat_id/:sub_name/:date', function(a, b) {
    cat_id = a.params.cat_id, sub_name = a.params.sub_name, dat = a.params.date, sch = [];
    var e = [];
    item.find({
        cat_id: cat_id,
        sub_name: sub_name
    }, function(f, g) {
        if (g) {
            for (var h in dates.find(function(j, k) {
                    e = j ? 'false' : k
                }), g) id = g[h]._id;
            b.json({
                msg: g,
                sc: e
            })
        } else b.json('failed')
    })
}), router.get('/get-all-dates', function(a, b) {
    dates.find(function(e, f) {
        b.json(f)
    })
}), router.delete('/delete-date/:date_id', function(a, b) {
    id = a.params.date_id, dates.deleteOne({
        _id: id
    }, function(e, f) {
        f ? b.json({
            success: !0,
            msg: f
        }) : b.json({
            success: !1,
            msg: e
        })
    })
}), router.post('/post-dates', function(a, b) {
    var e = [];
    0 < a.body.schArray.length && (a.body.schArray.forEach(function(f) {
        var g = new dates({
            date: f[0],
            item_id: f[1]
        });
        dates.deleteOne({
            date: f[0],
            item_id: f[1]
        }, function() {}), g.save(function() {}), e.push(g)
    }, void 0), b.json({
        msg: e
    })), 0 < a.body.remArray.length ? (a.body.remArray.forEach(function(f) {
        dates.deleteOne({
            date: f[0],
            item_id: f[1]
        }, function() {}), e.push(newdate)
    }, void 0), b.json({
        msg: e
    })) : b.json({
        msg: 'no length'
    })
}), router.post('/add-user', function(a, b) {
    var e = new user({
        id: a.body.id,
        email: a.body.email,
        name: a.body.name,
        mobile: a.body.mobile,
        password: a.body.password,
        address: a.body.address,
        rewardPoints: 0
    });
    e.save(function(f) {
        f ? b.json({
            msg: 'failed'
        }) : b.json({
            msg: 'User Added Successfully'
        })
    })
}), router.get('/get-users', function(a, b) {
    user.find(function(e, f) {
        b.json(f)
    })
}), router.get('/get-tab-status/:tab', function(a, b) {
    tab = a.params.tab, TabStatus.find({
        tab: tab
    }, function(e, f) {
        e ? b.json({
            success: !1,
            msg: e
        }) : 0 < f.length ? b.json({
            success: !0,
            msg: f
        }) : b.json({
            success: !1,
            msg: f
        })
    })
}), router.get('/post-tab-status/:tab/:status', function(a, b) {
    if (tab = a.params.tab, status = a.params.status, 'true' == status) {
        var e = new TabStatus({
            tab: tab,
            status: status
        });
        e.save(function(f, g) {
            f ? b.json({
                success: !0,
                msg: f
            }) : b.json({
                success: !0,
                msg: g,
                added: 'added'
            })
        })
    } else TabStatus.findOneAndRemove({
        tab: tab
    }, function(f, g) {
        g ? b.json({
            success: !0,
            msg: g,
            add: 'removed'
        }) : b.json({
            success: !1,
            msg: f
        })
    })
}), router.get('/get-user-menu', function() {
    category.find(function() {})
}), router.get('/get-dates-menu/:date/:last_date', function(a, b) {
    date = a.params.date, last_date = a.params.last_date, dates.find({
        date: date
    }, function(e, f) {
        e ? b.json({
            success: !1,
            msg: e
        }) : b.json({
            success: !0,
            msg: f
        })
    })
}), router.get('/get-item-details/:item_id', function(a, b) {
    id = a.params.item_id, item.find({
        _id: id
    }, function(e, f) {
        e ? b.json({
            success: !1,
            msg: e
        }) : 0 < f.length ? b.json({
            success: !0,
            msg: f
        }) : b.json({
            success: !1,
            msg: 'item_length_zero'
        })
    })
}), module.exports = router;