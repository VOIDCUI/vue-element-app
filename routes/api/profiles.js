// @login & @register 
const express = require("express");
const router = express.Router();
const passport = require("passport");

const Profile = require("../../models/Profile");



// $router GET api/profiles/test
// @desc 测试接口
// @access private

router.get("/test",(req,res) => {
    res.json({msg:"Profile works"})
})

// $router POST api/profiles/add
// @desc 添加信息接口
// @access private

router.post("/add",passport.authenticate("jwt",{session:false}),(req,res) => {
   const profileFields ={};

   if(req.body.type) profileFields.type = req.body.type;
   if(req.body.describe) profileFields.describe = req.body.describe;
   if(req.body.income) profileFields.income = req.body.income;
   if(req.body.expend) profileFields.expend = req.body.expend;
   if(req.body.cash) profileFields.cash = req.body.cash;
   if(req.body.remark) profileFields.remark = req.body.remark;


   new Profile(profileFields).save().then( Profile => {
        res.json(Profile);
    }) 
});



// $router GET api/profiles
// @desc 获取信息接口
// @access private

router.get("/",passport.authenticate("jwt",{session:false}),(req,res) => {
    Profile.find()
    .then(profile =>{
        if(!profile){
            return res.status(400).json('没有任何内容');
        }
            return res.json(profile);
    })
    .catch(err => res.status(400).json(err));
 });
 

 router.get("/:id",passport.authenticate("jwt",{session:false}),(req,res) => {
    Profile.findOne({_id:req.params.id})
    .then(profile =>{
        if(!profile){
            return res.status(400).json('没有任何内容');
        }
            return res.json(profile);
    })
    .catch(err => res.status(400).json(err));
 });
 

// $router POST api/profiles/edit
// @desc 编辑信息接口
// @access private

router.post("/edit/:id",passport.authenticate("jwt",{session:false}),(req,res) => {
    const profileFields ={};
    if(req.body.type) profileFields.type = req.body.type;
    if(req.body.describe) profileFields.describe = req.body.describe;
    if(req.body.income) profileFields.income = req.body.income;
    if(req.body.expend) profileFields.expend = req.body.expend;
    if(req.body.cash) profileFields.cash = req.body.cash;
    if(req.body.remark) profileFields.remark = req.body.remark;
    
    Profile.findOneAndUpdate(
        {_id:req.params.id},
        {$set:profileFields},
        {new:true}
    ).then(profile => res.json(profile))
  }
);


// $router delete api/profiles/delete
// @desc 删除信息接口
// @access private

router.delete("/delete/:id",passport.authenticate("jwt",{session:false}),(req,res) => {
    Profile.findOneAndRemove({_id:req.params.id},)
    .then(profile => profile.save())
    .then(profile => res.json(profile))
    .catch(err => res.status(404).json("删除信息失败!"))
  }
);
 



module.exports = router;