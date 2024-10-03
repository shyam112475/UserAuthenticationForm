
const jwt = require('jsonwebtoken')

function authorization (req,res,next){
    token =   req.cookies.Token
    if(!token){
      res.status(403).render('login',{message:'pls login or signUp'})
    }
    jwt.verify(token,process.env.SECUREKEY,(err,user)=>{
      if(err){
        res.status(403).render('login',{message:'pls login or signUp'})
      }else{
        req.user = user
        next()
      }
    })
      
  }

  module.exports = authorization;