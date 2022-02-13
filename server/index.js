const express = require ('express')
const articleRoutes= require('./routes/articles')
const userRoute= require('./routes/user')
// const Article = require('./models/articles')
const signuproute = require('./routes/signup')
const HomeRoute = require ('./routes/home')
const RegisterRoute = require ('./routes/auth')

const mongoose = require('mongoose')
const {param}= require('express/lib/request')
const authorization = require('./middlewares/auth')
const req = require('express/lib/request');
const cors = require('cors')
const app = express ()
app.use(cors());
app.use(express.json());

//connect to DB
mongoose.connect('mongodb://localhost:27017/blog')
// app.get('/', (req,res)=> {
//     res.send('welcome here')
// })
app.use('/uploads', express.static('uploads'));
app.use('/signUp' , signuproute);   
app.use('/users' , userRoute);
app.use('/', RegisterRoute)

app.use('/Home' , HomeRoute);   


app.use(authorization);        

app.use('/posts',articleRoutes);





app.use('*', (req, res, next) => {
    res.status(404).end()
})

app.use((err, req, res, next) => {
    console.log(err,'test')
    res.json(err)
    res.status(404).end();

})

app.listen(4000, () => {
    console.log('App is running on port:4000')
})