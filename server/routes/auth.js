const router= require('express').Router()
const User = require ('../models/users')
const {create}= require('../controllers/user')

const express = require ('express')
router.post('/register', async (req,res, next)=> {
    const user = req.body;
    console.log("text",user)
create(user)
    .then((doc) => res.json(doc))
    .catch((e) => next(e));

})

// router.post('/login')



module.exports=router;