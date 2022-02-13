const express = require ('express');
const router = express.Router();
const User = require ('../models/users')
const req = require ('express/lib/request')

router.post('/', async(req, res, next) => {
    const newUser = req.body;
    try{ 
        const userDoc = await User.create(newUser)
        res.json({'Response':'succcess','Data':userDoc});
    }
    catch(error)
    { next(error); } 
});
module.exports = router;