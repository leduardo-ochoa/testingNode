const express = require('express');
const router = express.Router();
const User = require('../models/users');
const checkAuth = require('../middleware/check-jwt');


router.post('/getUserByEmail',(req,res)=>{

    User.findOne({email: req.body.email}, function(err,user){
        if(user===null){
            return res.status(404).json({
                message: 'Wrong email'
            })
        }else{
            return res.status(200).json({
                message: 'User found:',
                userFound: user
            })
        }
    })
})

router.put('/setPassword',(req,res)=>{
    
    User.findOneAndUpdate({email: req.body.email },{$set: { password:req.body.newPassword}},{new:true}, (err,data)=>{

        if(data!=null){
            res.status(200).json({
                message: 'Your password has been updated',
                update: data
            })
        }else{
            res.status(400).json({
                message: 'Error updating your password',
                error : err                
            })
        }
    })
})

//CheckAuth goes after the route because it has to check first if it's correct before giving a response
router.post('/checkAuth',checkAuth,(req,res)=>{
    res.send({
        message:'Entro en /checkAuth'
    })
})



// Devuelve el módulo que utiliza app.use
module.exports = router;