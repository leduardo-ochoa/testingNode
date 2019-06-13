const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');

// /db es una subdirección del app.use('/user')
router.get('/db',(req,res)=>{
    res.status(200).json({
        body: 'im in /db'
    })
});

// el req.body.*** lo que hace es que obliga a que en el body
// haya un parámetro del nombre ***
router.post('/db', (req,res)=>{
    const user = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        country: req.body.country,
        cellphone: req.body.cellphone,
        birthDate: req.body.birthDate,
        address: req.body.address
    });
    console.log('in user is ',user);
    //El then es una promesa
    user.save().then(result =>{
        console.log('Creé el usuario',result);
        res.status(200).json({
            message: 'Usuario creado con éxito',
            userCreated: result
        })
    }).catch(err =>{
        res.status(500).json({
            message: 'Error al crear el usuario',
            error: err
        })
    })
})

router.get('/',(req,res)=>{
    console.log('estoy entrando');
    res.send({
        body: 'I am in /user'
    })
});

router.post('/login',(req,res)=>{
    //jwt login
    User.findOne({'email':req.body.email, 'password':req.body.password},(err,data)=>{
        if(data===null){
            res.status(404).json({
                message: 'Wrong email or password',
                error: err
            })
        }else{
            const token = jwt.sign({
                //This allows me to relate a email and password to a JWT
                email: data.email,
                password: data.password,
                
            },"secret",
            {
                expiresIn: "15m"
            })

            res.status(200).json({
                message: 'You have logged succesfully',
                token: token
            })
        }
    })
})


module.exports = router;

