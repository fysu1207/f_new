const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Order = require('../models/order');
const dateItem = require('../models/dateItem');
const bcrypt = require('bcryptjs');
const SendOtp = require('sendotp');
const Razorpay = require('razorpay');

// Key : rzp_test_w2CGfBqrpGcF5o
// Secret: r8bFH3nKa0z058fIWo8pbxtC
let rzp = new Razorpay({
    key_id: ' rzp_live_qNI6V5maLBak44', // your `KEY_ID`
    key_secret: 'lM0HT7rLLHAIguyJIFv0jQ8y' // your `KEY_SECRET`
});

// Capture payment
router.post('/capture-payment', (req, res, next) => {
    console.log('reached');
    payment_id = req.body.payment_id;
    rzp.payments.capture(payment_id, 1000).then((data) => {
        // success
        res.json({success: true, msg: data});
    }).catch((error) => {
        // error
        res.json({success: false, msg: error});
    });
});



const sendOtp = new SendOtp('169485AwtkPnUOqshf598d9ce4');
// sendOtp.setOtpExpiry('1');
// resend after 1 minute



// Send otp
router.get('/send-otp/:mobile', (req, res, next) => {
    
    mobile = req.params.mobile;
    let input = "91"+mobile;
    // console.log(res.json({input:input}));
    sendOtp.send(input, "FYSUBX", (err,data,response)=>{
        if(err){
            res.json({success:false,msg:err});
        }else{
            res.json({success:true,msg:data});
        }
    });
    // res.json({msg:'sent'});
});

router.get('/retry-otp/:mobile',(req,res,next)=>{
    let mobile = req.params.mobile;
    let input = "91"+mobile;
    // res.json({input});
    sendOtp.retry(input,false,(error,data,response)=>{
        if(data.type == 'success'){
            res.json({success: true, msg: data});
        }else{
            res.json({success:false,msg:data});
        }
    });
});

// Register
router.post('/register', (req, res, next) => {

    mobile = req.body.mobile;
    let input = "91"+mobile;
    otp = req.body.otp;


    // res.json({mob:otp});
    let newUser = new User({
        email: req.body.email,
        mobile: req.body.mobile,
        name: req.body.name,
        password: req.body.password,
        address: req.body.address,
        rewardPoints: req.body.rewardPoints
    });
    // Verify OTP
    sendOtp.verify(input,otp, function (error, data, response) {
        // console.log(data); // data object with keys 'message' and 'type'
        if(data.type == 'success') {
            // res.json({success:true,msg:"success"});
            let newUser = new User({
                email: req.body.email,
                mobile: req.body.mobile,
                name: req.body.name,
                password: req.body.password,
                address: req.body.address,
                rewardPoints: req.body.rewardPoints
            });

            User.addUser(newUser, (er, user) => {
                if (er) {
                    res.json({ success: false, msg: 'Failed to Register' })
                } else {
                    res.json({ success: true, msg: user });

                }
            });
        }
        if(data.type == 'error') {
            res.json({success:false,msg:data});
        }
      });

    
});
    

// Update User
router.post('/update-user', (req, res, next) => {

        id = req.body.id;
        email= req.body.email;
        mobile= req.body.mobile;
        name= req.body.name;

    User.findOneAndUpdate({_id:id},{$set:{email : email , mobile : mobile , name : name}}).exec((err,us)=>{
        if(err){
            res.json({success:false,msg:err});
        }else{
            res.json({success:true,msg:us});
            // if(us.length > 0){
            // }else{
            //     res.json({success:false,msg:'Something went wrong'});
            // }
        }
    });
});

router.post('/delete-address',(req,res,next)=>{

    user_id = req.body.user_id;
    address = req.body.address;

    User.update({_id:user_id},{$pullAll:{address:[address]}}).exec((err,user)=>{
        if(err){
            res.json({success:false,msg:err});
        }else{
            if(user){
                res.json({success:true,msg:user});
            }
        }
    });
    
});
// Update address
router.post('/update-address',(req,res,next)=>{

    user_id = req.body.user_id;
    address = req.body.original;
    pl_address = req.body.edited;

    User.update({_id:user_id},{$pullAll:{address:[address]}}).exec((err,user)=>{
        if(err){
            res.json({success:false,msg:err});
        }else{
            if(user){
                // Add placeholder address
                User.findOneAndUpdate({ _id: user_id }, { $addToSet: {address : pl_address} }).exec((eror, us) => {
                    if (eror) {
                        res.json({ success: false, msg: err });
                    } else {
                        res.json({ success: true, msg: us });
                    }
                });

            }
        }
    });
    
});
// Save address
router.post('/save-address', (req, res, next) => {

        user_id = req.body.user_id;
        address = req.body.address;

    User.find({_id:user_id},(err,us)=>{
        if(err){
            res.json({success:false,msg:err});
        }
        if(us){
            // user exists on the sent id
            // check if address already exists
            let add = us.address;
            if(add == null){
                // insert
                User.findOneAndUpdate({ _id: user_id }, { $addToSet: {address : address} }).exec((err, us) => {
                    if (err) {
                        res.json({ success: false, msg: err });
                    } else {
                        res.json({ success: true, msg: us });
                        // if(us.length > 0){
                        // }else{
                        //     res.json({success:false,msg:'Something went wrong'});
                        // }
                    }
                });
            }
        }
    });
});

router.post('/update-pwd',(req,res,next)=>{
    user_id = req.body.u_id;
    password = req.body.password;
    newPassword = req.body.new_password;

    User.find({_id:user_id},(err,user)=>{
        // res.json({success:false,msg:user[0].email});
        if(user){
            User.comparePassword(password, user[0].password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                // Password matched
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newPassword, salt, (err, hash) => {
                            if (err) throw err;
                            user[0].password = hash;
                            user[0].save((err,saved)=>{
                                if(err){
                                    res.json({ success: false, msg: err });   
                                }else{
                                    res.json({ success: true, msg: saved });   
                                    // if(saved.length > 0){
                                    // }
                                }
                            });
                        })
                    })
                } else {
                    res.json({ success: false, msg: 'Wrong Password' });
                }
            })
        }
    });

});

// Update pwd
router.post('/update-pwd-home',(req,res,next)=>{

    mob = req.body.mobile;
    otp = req.body.otp;
    password = req.body.newPwd;

    let input = "91"+mob;
    // res.json({input});

    sendOtp.verify(input,otp, function (error, data, response) {
        // console.log(data); // data object with keys 'message' and 'type'
        if(data.type == 'success') {
            // Update password
            User.find({mobile:mob},(err,user)=>{
                // res.json({success:false,msg:user[0].email});
                if(user){
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(password, salt, (err, hash) => {
                            if (err) throw err;
                            user[0].password = hash;
                            user[0].save((err,saved)=>{
                                if(err){
                                    res.json({ success: false, msg: err });   
                                }else{
                                    res.json({ success: true, msg: saved });   
                                }
                            });
                        })
                    })
                }
            });
        }
        if(data.type == 'error') {
            res.json({success:false,msg:data});
        }
      });


});
// Find Email
router.get('/find-email/:email', (req, res, next) => {
    e = req.params.email;

    User.find({email: e},(err,re)=>{
        if(re){
            if(re.length>0){
                res.json({success:true, msg:'User Found'});
            }else{
                res.json({succcess:false, msg:'No user found'});
            }
        }else{
            res.json({succcess:false, msg:'No user found'});
        }
    });
});
// Get Mobile from Email
router.get('/get-mobile-from-email/:email', (req, res, next) => {
    
    e = req.params.email;

    User.find({email: e},(err,re)=>{
        if(re){
            if(re.length>0){
                res.json({success:true, msg:re[0].mobile});
            }else{
                res.json({succcess:false, msg:'No user found'});
            }
        }else{
            res.json({succcess:false, msg:'No user found'});
        }
    });
});

// Find Mobile
router.get('/find-mobile/:mobile', (req, res, next) => {

    m = req.params.mobile;

    User.find({mobile: m},(err,re)=>{
        if (re) {
            if (re.length > 0) {
                res.json({ success: true, msg: 'User Found' });
            } else {
                res.json({ succcess: false, msg: 'No user found' });
            }
        } else {
            res.json({ succcess: false, msg: 'No user found' });
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    if(/^\d{10}$/.test(email)){
        User.getUserByMobile(email, (err, user) => {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, msg: 'User not found' });
            }
            User.comparePassword(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    const token = jwt.sign({ data: user }, config.secret, {
                        expiresIn: 604800 //A week in seconds
                    });
    
                    res.json({
                        success: true,
                        token: 'JWT ' + token,
                        user: {
                            id: user._id,
                            name: user.name,
                            username: user.username,
                            email: user.email,
                            mobile: user.mobile
                        }
                    })
                } else {
                    res.json({ success: false, msg: 'Wrong Password' });
                }
            })
        });
    }else{
        User.getUserByEmail(email, (err, user) => {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, msg: 'User not found' });
            }
            User.comparePassword(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    const token = jwt.sign({ data: user }, config.secret, {
                        expiresIn: 604800 //A week in seconds
                    });
    
                    res.json({
                        success: true,
                        token: 'JWT ' + token,
                        user: {
                            id: user._id,
                            name: user.name,
                            username: user.username,
                            email: user.email,
                            mobile: user.mobile
                        }
                    })
                } else {
                    res.json({ success: false, msg: 'Wrong Password' });
                }
            })
        });
    }
});
// Find Email
router.get('/get-address/:user_id', (req, res, next) => {
    id = req.params.user_id;

    User.find({ _id: id }, (err, re) => {
        if (re) {
            if (re.length > 0) {
                res.json({ success: true, msg: re });
            } else {
                res.json({ succcess: false, msg: 'No user found' });
            }
        } else {
            res.json({ succcess: false, msg: 'No user found' });
        }
    });
});

// Get user's reward points
router.get('/get-user-rewards/:user_id', (req, res, next) => {
    id = req.params.user_id;

    User.find({ _id: id }, (err, re) => {
        if (re) {
            if (re.length > 0) {
                res.json({ success: true, msg: re[0].rewardPoints });
            } else {
                res.json({ succcess: false, msg: 'No user found' });
            }
        } else {
            res.json({ succcess: false, msg: 'No user found' });
        }
    });
});

// Post order
router.post('/post-order', (req, res, next) => {
    order = req.body.order_dets;

    let newOrder = new Order({
        order: order
    });
    newOrder.save((err,or)=>{
        if(err){
            res.json({success:false,msg:err});
        }else{
            res.json({success:true,msg:or});
        }
    });
});
// Post dateItem
router.post('/post-dateItem', (req, res, next) => {
    dateItem = req.body.dateItem;

    let dI = new dateItem({
        dateItem : dateItem
    });
    dI.save((err,or)=>{
        if(err){
            res.json({success:false,msg:err});
        }else{
            res.json({success:true,msg:or});
        }
    });
});

// Post dateItem
router.post('/get-dateItem', (req, res, next) => {
    dateItem = req.body.dateItem;
    dateItem.find((err,dateItems)=>{
        if(dateItems) {
            res.json({success: true, msg: dateItems});
        }else {
            if(err) {
                res.json({success: false, msg: 'Something wrong'});
            }else {
                res.json({success: false, msg: err});
            }
        }
    });
});

router.get('/get-user-orders/:user_id', (req, res, next) => {

    user_id = req.params.user_id;
    var user_orders = [];
    
    // User.find({ _id: user_id }, (err, user) => {
    //     if (err) {
    //         res.json({ success: false, msg: err });
    //     } else {
    //         return res.json({ success: true, msg: user });
    //     }
    // });

    Order.find((err, order) => {
        if (err) {
            res.json({ success: false, msg: err });
        } else {
            order.forEach(element => {
               if(element.order.user_id === user_id){
                user_orders.push(element);
               }
            });
            res.json({success: true, msg: user_orders});
        }
    });
});


module.exports = router;