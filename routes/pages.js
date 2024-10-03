const express = require('express')
const authorization = require('../controllers/authorization')
//const router = require('./auth')

const router  = express.Router()

router.get('/',(req,res)=>{
    res.send('hello from the server side')
})
router.get('/index',(req,res)=>{
    res.render('index')
})
router.get('/register',(req,res)=>{
    res.render('register')
})
router.get('/secure',authorization,(req,res)=>{
    res.render('secure')
})
router.get('/login',(req,res)=>{
    res.render('login')
})
router.get('/logout',(req,res)=>{
    res.render('logout')
})



module.exports = router;