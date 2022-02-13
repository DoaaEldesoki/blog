const jwt = require ('jsonwebtoken')
const User= require('../models/users')
const auth = (req, res, next )=> {
    console.log(req.headers);

    try {

    const {authorization} = req.headers
    const payload = jwt.verify(authorization,'hf5246748sjnjdhdhhddnn' ) 
    const user= User.findOne({username: payload.username})
    .then(user =>{
        req.user= user;
        next ()
    })
}
catch(error){
next (error)
}
}
module.exports= auth;