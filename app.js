const express = require('express');
const port = process.env.PORT || 8000
const app = express();
const path = require('path');
const pages = require('./routes/pages')
const auth = require('./routes/auth')
const db = require('./database/db');
const cookieParser = require('cookie-parser');


app.use(cookieParser())


const public_path = path.join(__dirname,'./public')



app.use(express.json());
app.use(express.urlencoded({extended:false}))


app.use(express.static(public_path))
app.set('view engine','hbs')

app.use('/',pages)
app.use('/',auth)


app.listen(port,()=>{
    console.log(`connected to the port no ${port}`)
})