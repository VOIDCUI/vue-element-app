// @login & @register 
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const keys = require("../../config/key");
const passport = require("passport");



//import user model
const User = require("../../models/User");


// $router GET api/users/test
// @desc return data.json
// @access public
router.get("/test",(req,res) => {
    res.json({msg:"Login works"})
})

// $router POST api/users/register
// @desc return data.json
// @access public
router.post("/register",(req,res) => {
    User.findOne({email:req.body.email})
    .then((user) => {
        if(user){
            return res.status(400).json("此邮箱已被注册!")
        }
        else{
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
                });
            const newUser = new User({
                name:req.body.name,
                password:req.body.password,
                email:req.body.email,
                avatar,
                identity:req.body.identity
            })
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, function(err, hash) {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                           .then((user) => res.json(user))
                           .catch((err) => console.log(err));
                });
            });
        }
    })
})


// $router POST api/users/login
// @desc return data.json
// @access public
router.post('/login',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email})
                    .then(user => {
                        if(!user){
                            return res.status(400).json('用户不存在!')
                        }
                        bcrypt.compare(password, user.password)
                            .then(isMatch=>{
                                if(isMatch){
                                    const rule = {
                                        id:user.id,
                                        name:user.name,
                                        avatar:user.avatar,
                                        identity:user.identity
                                    }
                                    jwt.sign(rule,'secret',{ expiresIn:3600 },(err,token)=>{
                                        if(err) throw err;
                                        res.json({
                                            success:true,
                                            token:'Bearer '+token
                                        })
                                    })
                                }else{
                                    return res.status(400).json('密码错误')
                                }
                            })
                    })
                    .catch()
})
// $router GET api/users/current
// @desc return current.user
// @access private
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res) => {
    res.json({
        id:req.user.name,
        name:req.user.name,
        email: req.user.email,
        identity:req.user.identity
    })
})






module.exports = router;