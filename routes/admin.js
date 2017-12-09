const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const bodyParser = require('body-parser');
const user = require('../models/user.js');
const item = require('../models/item.js');
const dates = require('../models/dates.js');
const Order = require('../models/order.js');
const category = require('../models/category.js');
const Admin = require('../models/admin');
const TabStatus = require('../models/tabStatus');
var moment = require('moment');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// Admin Register
// Register
router.post('/register', (req, res, next) => {
    let newAdmin = new Admin({
        adminname: req.body.adminname,
        password: req.body.password
    });

    Admin.addAdmin(newAdmin, (er, admin) => {
        if (er) {
            res.json({ success: false, msg: 'Failed to Register' })
        } else {
            res.json({ success: true, msg: 'Admin registered !' })

        }
    });
});
// Authenticate
router.post('/authenticate', (req, res, next) => {
    // res.json({msg:'reached'});
    const adminname = req.body.adminname;
    const password = req.body.password;

    Admin.getAdminByAdminname(adminname, (err, admin) => {
        if (err) throw err;
        if (!admin) {
            res.json({ success: false, msg: 'Admin not found' });
        }else{
            Admin.comparePassword(password, admin.password, (errr, isMatch) => {
                if (errr){
                    res.json({success: false, msg:errr});
                }
                if (isMatch) {
                    const token = jwt.sign({ data: admin }, config.secret, {
                        expiresIn: 604800 //A week in seconds
                    });
    
                    res.json({
                        success: true,
                        token: 'JWT ' + token,
                        admin: {
                            id: admin._id,
                        }
                    })
                } else {
                    res.json({ success: false, msg: 'Wrong Password' });
                }
            })
        }
    });
});
router.get('/get-admins',(req,res, next)=>{
    Admin.find((err,admins)=>{
        if(err){
            res.json({success:false, msg: err});
        }else{
            res.json({success:true, msg: admins});
        }
    });
});

router.delete('/delete-admin/:admin_id',(req,res, next)=>{
    id = req.params.admin_id;
    Admin.deleteOne({_id:id},(err,deleted)=>{
        if(err){
            res.json({success: false, msg:err});
        }else{
            res.json({success: true, msg: deleted});
        }
    })
});
// Add Category Page

// Add Category
router.post('/add-category', (req, res, next) => {
    let newCat = new category({
        name: req.body.name
    })
    newCat.save((err, data) => {
        if (err) {
            res.json({
                msg: 'failed'
            });
        } else {
            res.json({
                msg: 'success'
            });
        }
    })
});

// Delete Category
router.delete('/delete-category/:id', (req, res, next) => {
    // Deleting data
    category.remove({
        _id: req.params.id
    }, (err, result) => {
        if (err) {
            res.json('failed');
        } else {
            res.json('success');
        }
    })
});

// Get categories
router.get('/get-categories', (req, res, next) => {
    category.find(function (err, datum) {
        if (err) {
            res.json({ success: false, msg: err });
        } else {
            res.json({ success: true, msg: datum });
        }
    })
});

// Get Orders
router.get('/get-orders', (req, res, next) => {
    Order.find(function (err, datum) {
        if (err) {
            res.json({ success: false, msg: err });
        } else {
            res.json({ success: true, msg: datum });
        }
    })
});
// Get order from user id
router.get('/get-user-from-id/:user_id', (req, res, next) => {

    user_id = req.params.user_id;
    user.find({ _id: user_id }, (err, user) => {
        if (err) {
            res.json({ success: false, msg: err });
        } else {
            return res.json({ success: true, msg: user });
        }
    });
});

router.get('/get-user-from-id/:user_id', (req, res, next) => {

    user_id = req.params.user_id;
    user.find({ _id: user_id }, (err, user) => {
        if (err) {
            res.json({ success: false, msg: err });
        } else {
            return res.json({ success: true, msg: user });
        }
    });
});

// Post reward points
router.get('/post-rewards/:email/:points', (req, res, next) => {

    email = req.params.email;
    points = req.params.points;
    user.find({ email: email }, (err, us) => {

        if (err) {
            res.json({ success: false, msg: err });
        } else {
            var point;
            if (isNaN(us[0].rewardPoints)){
                point = 0;
            }else{
                point = us[0].rewardPoints;
            }
            // point = parseInt(point);
            // points = parseInt();
            var t_points = parseInt(point) + parseInt(points);
            var t_points = parseInt(t_points);
            user.findOneAndUpdate({ email: email }, { $set: { rewardPoints: t_points } }).exec((err, u) => {
                if (err) {
                    res.json({ success: false, msg: err });
                } else {
                    res.json({ success: true, msg: u });
                }
            });
        }

    });

    
});
router.get('/rep-rewards/:email/:points', (req, res, next) => {

    email = req.params.email;
    points = req.params.points;
    user.find({ email: email }, (err, us) => {

        if (err) {
            res.json({ success: false, msg: err });
        } else {
            var point;
            if (isNaN(us[0].rewardPoints)){
                point = 0;
            }else{
                point = us[0].rewardPoints;
            }
            // point = parseInt(point);
            // points = parseInt();
            var t_points = parseInt(points);
            var t_points = parseInt(t_points);
            user.findOneAndUpdate({ email: email }, { $set: { rewardPoints: t_points } }).exec((err, u) => {
                if (err) {
                    res.json({ success: false, msg: err });
                } else {
                    res.json({ success: true, msg: u });
                }
            });
        }

    });

    
});

// Get User from user id
router.get('/get-user-orders/:user_id', (req, res, next) => {

    user_id = req.params.user_id;

    Order.find(function (err, datum) {
        if (err) {
            res.json({ success: false, msg: err });
        } else {
            res.json({ success: true, msg: datum });
        }
    })

});




// Add Items Page
// Add item
router.post('/add-item', (req, res, next) => {
    cat_id = req.body.cat_id;
    sub_name = req.body.sub_name;
    item_name = req.body.item_name;
    item_price = req.body.item_price;
    item_img = req.body.item_img;
    let newItem = new item({
        cat_id: cat_id,
        sub_name: sub_name,
        item_name: item_name,
        item_price: item_price,
        item_img: item_img
    })

    newItem.save((err, data) => {
        if (err) {
            res.json(err);
        } else {
            res.json({
                msg: 'success'
            });
        }
    })
});
// Get all Items
router.get('/get-items/:cat_id/:sub_name', (req, res, next) => {
    cat_id = req.params.cat_id;
    sub_name = req.params.sub_name;
    item.find({ cat_id: cat_id, sub_name: sub_name }, (err, result) => {
        if (result) {
            res.json(result);
        } else {
            res.json('failed');
        }
    });
});

// Get all Items
router.get('/get-roti-items', (req, res, next) => {
    sub_name = 'Roti';
    item.find({ sub_name: sub_name }, (err, result) => {
        if (result) {
            res.json({ success: true, msg: result });
        } else {
            res.json({ success: false, msg: 'failed' });
        }
    });
});
// Delete Item
router.delete('/delete-item/:item_id', (req, res, next) => {
    id = req.params.item_id;
    item.remove({ _id: id }, (err, dara) => {
        if (err) {
            res.json({ success: false, msg: err });
        } else {
            res.json({ success: true, msg: dara });
        }
    });
});

// Add Sub Categories Page

// Add Sub Category
router.post('/add-sub-category', (req, res, next) => {

    category_id = req.body.category_id;
    sub_name = req.body.sub;

    category.find({
        _id: category_id
    }, (err, result) => {
        // res.json(err);
        // res.json(result[0]);
        if (result) {
            result[0].subs.push(sub_name);
            result[0].save((err, sub) => {
                if (sub) {
                    res.json({
                        msg: 'success'
                    });
                } else {
                    res.json({
                        msg: 'failed'
                    });
                }
            });
        } else {
            res.json({
                msg: 'failed'
            });
        }
    });
});

// Get Subs from a category
router.get('/get-subs/:catId', (req, res, next) => {
    cat_id = req.params.catId;
    category.find({
        _id: cat_id
    }, (err, result) => {
        if (err) {
            res.json({ msg: 'failed' });
        } else {
            // res.json({msg:'result'});
            res.json(result[0].subs);
        }
    });
});

// Delete SubCategory
router.delete('/delete-sub-category/:name/:cat_id', (req, res, next) => {
    cat_id = req.params.cat_id;
    sub_name = req.params.name;
    // Deleting data
    category.find({
        _id: cat_id
    }, (err, result) => {
        if (err) {
            res.json({
                msg: 'failed'
            });
        } else {
            // res.json({msg:'result'});
            // res.json(result[0].subs);
            var index = result[0].subs.indexOf(sub_name);
            if (index > -1) {
                // result[0].subs.filter();
                result[0].subs = result[0].subs.filter(function (n) {
                    return n != undefined
                });
                result[0].subs.splice(index, 1);
                result[0].save((err, sub) => {
                    if (sub) {
                        res.json({
                            msg: 'success'
                        });
                    } else {
                        res.json({
                            msg: 'failed'
                        });
                    }
                });
                // res.json({msg:'success'});
            }

        }
    });
});


// Add Menu Page
// Get Date Items
router.get('/get-date-items/:cat_id/:sub_name/:date', (req, res, next) => {
    cat_id = req.params.cat_id;
    sub_name = req.params.sub_name;
    dat = req.params.date;
    sch = [];
    var d = [];
    item.find({ cat_id: cat_id, sub_name: sub_name }, (err, result) => {
        if (result) {
            // ret = JSON.parse(result);
            // s = result[0];

            dates.find((err, dati) => {
                if (err) {
                    d = "false";
                } else {
                    d = dati;
                }
            });

            for (var i in result) {
                id = result[i]._id;

                // dates.find({date:dat, item_id: id},(err,ri)=>{
                // sch.push('mm');
                // sch.push('ink');
                // if(ri){
                //     sch.push('one');
                // }else{
                //     sch.push('m');
                // }
                // });
            }
            res.json({ msg: result, sc: d });

        } else {
            res.json('failed');
        }
    });
});

router.get('/get-all-dates', (req, res, next) => {
    dates.find((err, ds) => {
        res.json(ds);
    });
});

router.delete('/delete-date/:date_id', (req, res, next) => {
    id = req.params.date_id;
    dates.deleteOne({ _id: id }, (err, status) => {
        if (status) {
            res.json({ success: true, msg: status });
        } else {
            res.json({ success: false, msg: err });
        }
    });
    // dates.remove((err,status)=>{
    //     if(err){
    //         res.json({ success: false, msg: err });
    //     }else{
    //         res.json({ success: true, msg: status });
    //     }
    // });
});

// Add schdule
router.post('/post-dates', (req, res, next) => {

    // res.json(req.body.schArray.length);
    // // // check if any elements need to be added
    let ar =[];
    if (req.body.schArray.length > 0) {
        req.body.schArray.forEach(function(element) {
            // ar.push(element[1]);

            let newdate = new dates({
                date : element[0],
                item_id : element[1]
            });
            // Delete if exists
            dates.deleteOne({date:element[0],item_id:element[1]},(err,deleted)=>{
            });
            newdate.save((err,da)=>{

            });

            ar.push(newdate);

        }, this);
        res.json({msg:ar});
    }
    if (req.body.remArray.length > 0) {
        req.body.remArray.forEach(function(element) {
            // Delete
            dates.deleteOne({date:element[0],item_id:element[1]},(err,deleted)=>{
            });
            ar.push(newdate);

        }, this);
        res.json({msg:ar});
    }else{
        res.json({msg:'no length'})
    }

    // if (req.body.remArray.length > 0) {
    //     // req.body[1] = > Array of items to be removed
    //     for (var j = 0; j < req.body.remArray.length; j++) {

    //         datee = req.body.remArray[j][0];
    //         item_idd = req.body.remArray[j][1];

    //         dates.remove({
    //             date: datee, item_id: item_idd
    //         }, (err, ru) => {
    //             // this.remCheck = "true";
    //             if (err) {
    //                 // remCheck = "true";
    //             } else {
    //                 // remCheck = "true";
    //             }
    //         });

    //     }
    // } else {
    //     remCheck = "true";
    // }
    // res.json('returned');
    // res.json(addCheck);
});


// Params, date, cat_id 
// View Orders Page
// Reward Page
// Settings Page


router.post('/add-user', (req, res, next) => {

    let newUser = new user({
        id: req.body.id,
        email: req.body.email,
        name: req.body.name,
        mobile: req.body.mobile,
        password: req.body.password,
        address: req.body.address,
        rewardPoints: 0
    });

    newUser.save((err, data) => {
        if (err) {
            // error
            res.json({ msg: 'failed' });
        } else {
            res.json({ msg: 'User Added Successfully' });
        }
    });
});

// Get all users
router.get('/get-users', (req, res, next) => {
    user.find(function (err, datum) {
        res.json(datum);
    })

});

router.get('/get-tab-status/:tab', (req, res, next) => {
    tab = req.params.tab;
    TabStatus.find({tab:tab}, (err, data)=>{
        if(err){
            res.json({success:false,msg:err});
        }else{
            if(data.length>0){
                res.json({success:true,msg:data});
            }else{
                res.json({success:false,msg:data});
            }
        }
    });
});

router.get('/post-tab-status/:tab/:status', (req, res, next) => {
    tab = req.params.tab;
    status = req.params.status;
    
    if(status == "true"){
        let newTab = new TabStatus({
            tab: tab,
            status: status
        });
        // add
        newTab.save((err,tab)=>{
            if(err){
                res.json({success:true,msg:err});
            }else{
                res.json({success:true,msg:tab,added:'added'});
            }
        });
    }else{
        // remove
        TabStatus.findOneAndRemove({tab:tab},(err,ress)=>{
            if(ress){
                res.json({success:true,msg:ress,add:"removed"});
            }else{
                res.json({success:false,msg:err});
            }
        });
    }
});


// Users
router.get('/get-user-menu', (req, res, next) => {
    category.find((err, data) => {

    });
});

// get dates menu
router.get('/get-dates-menu/:date/:last_date', (req, res, next) => {
    date = req.params.date;
    last_date = req.params.last_date;
    dates.find({
        date: date
    }, (err, ditem) => {
        if (err) {
            res.json({ success: false, msg: err });
        } else {
            res.json({ success: true, msg: ditem });
        }
    });
});

// Get Item Details
router.get('/get-item-details/:item_id', (req, res, next) => {
    id = req.params.item_id;
    item.find({ _id: id }, (err, item_details) => {
        if (err) {
            res.json({ success: false, msg: err });
        } else {
            if (item_details.length > 0) {
                res.json({ success: true, msg: item_details })
            } else {
                res.json({ success: false, msg: 'item_length_zero' });
            }
        }
    });
});

module.exports = router;