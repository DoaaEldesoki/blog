const express = require('express');
const router = express.Router();
const req = require('express/lib/request');
const Post = require ('../models/articles.js')

router.get('/',async (req, res, next) => {
    const posts = await Post.find().populate({path:'user', select:'username _id'});
    res.json({'Response':'succcess','Data':posts}); 
});

router.get('/:id',async (req, res, next) => {
    const { id } = req.params;
    const posts = await Post.findById(id).populate({path:'user', select:'username _id'});
    res.json({'Response':'succcess','Data':posts}); 
});

module.exports = router;