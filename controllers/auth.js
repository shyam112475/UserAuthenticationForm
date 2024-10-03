const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('../database/db')
const cookieParser = require('cookie-parser');


exports.register = (req,res)=>{
    try{

    const {userName,email,password,cpassword} = req.body
    if(!email,!userName,!password){
      return res.send('all fields are required')
    }

    db.query('SELECT email FROM users WHERE email =  ?',[email],async(err,result)=>{
      if(result.length>0){
       return res.status(400).render('register',{message:`${email}  alrady exist plz register a new user`})
      }
      if(err){
        console.log(err)
        res.send('err')
      }
        if(password!==cpassword){
           res.status(401).render('register',{message:'passwords are not match'})
        }else{
            const hashpass = await bcrypt.hash(password,10)
            db.query('INSERT INTO users SET  ?',{userName:userName,email:email,password:hashpass})
              res.status(201).render('index',{message:`${email} registered succesfully`})
              
        }
    })
}catch(err){
res.status(500).send(err)
}}

exports.login = (req,res)=>{
  try{
  const {email,password} = req.body;
  db.query('SELECT * FROM users WHERE email = ?',[email],async(err,result)=>{
  if(result.length===0){
   return res.render('login',{message:'invalid email or password'})
  }
    ismatch = await bcrypt.compare(password,result[0].password)
    if(!ismatch){
     return res.status(401).render('login',{message:'invalid email or password'})
    }
    else{
    const Token = jwt.sign(email,process.env.SECUREKEY)
    res.cookie('Token',Token,{
      httpOnly:true,
      sameSite:'strict'
    })
     
     return res.status(201).render('index',{message:`${email} logged in sucessfull`})
     
    }
  })
}catch(err){
  res.status(500).send('err')
}
}
exports.logout = (req,res)=>{
  const {email,password} = req.body
  db.query(`SELECT * FROM users WHERE email = ?`,[email],async(err,result)=>{
    if(err)throw(err);
      isMatch = await bcrypt.compare(password,result[0].password)
      if(isMatch){
        res.render('index')
      res.clearCookie('Token',{
        httpOnly:true,
        sameSite:'strict'
      })
    }
    else{
      res.render('login',{message:'Enter a valid email or password'})
      
    
    }
  })
}




