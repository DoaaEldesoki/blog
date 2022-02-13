const express = require ('express')
const router = express.Router();
const User = require ('../models/users');
const { login }= require('../controllers/user')
const req= require ('express/lib/request')
const authmiddleware = require('../middlewares/auth')


router.post('/login'  , async (req, res, next) => {
    console.log(req.body)
    const {username , password} = req.body;
    const token = await login({username,password} , next) 
    res.json(token);
    // console.log(req.user);  
  
})

router.get('/', authmiddleware, async (req, res, next) => {
    const thisUser = req.user;
    res.json({'Response':'success', 'Data':thisUser});
})

// router.post('/Newuser/POST', async (req, res, next) => {
//     const body = req.body;
//     create(body).then(data=> res.json(data)).catch(err=> next(err))
//     // try {
    //     const doc = await User.create(user);
    //     res.json(doc);
    // } catch (err) {
    //     next(err.message)
    // }

//this 'login' to compare saved password and inserted password 
// router.post('/login', async (req, res, next) => {
//     const { username , password } = req.body;
//     const user = await User.findOne({ username : req.body.username }).exec(); // to get hash from it 
//     const token =  await login ({username, password});
//     res.json({token})
// })



// router.patch('/:id', async (req, res, next) => {
//     const id = req.params.id;
//     const body = req.body;
//     update(id, body)
//         .then((doc) => res.json({ message: "user was edited ", user: body }))
//         .catch((e) => next(e));
// })
router.patch('/' , authmiddleware ,async (req,res,next) => {
    const {username, firstName , lastName ,email} = req.body;
    const updatedUser = User.findOneAndUpdate( {_id:req.user._id} ,{username , firstName , lastName ,email},{ returnOriginal:false} ).exec()
    .then (data => res.json({'Response':'success', 'Data':data})) 
    .catch(err => next(err.message))
})

// router.delete('/:id', async (req, res, next) => {
//     const id = req.params.id;
//     delDoc(id)
//         .then((doc) => res.json(doc))
//         .catch((e) => next("ID is not found"));
// })
module.exports = router





















