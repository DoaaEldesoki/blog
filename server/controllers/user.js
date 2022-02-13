const User = require("../models/users");
const bcrybt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// const find = (q) => User.find(q);
const create = (user) => User.create(user);
// const update = ({username}, body) => User.findOneAndUpdate({ username: username}, {$set:{username:body.username}});
// const deleteOne = ({username}) => User.findOneAndDelete({ username: username });
// const findByUserName= ({username})=> User.findOne({username:username})

// const login = async ({ username, password }) => {
//     const user = await User.findOne({ username }).exec(); // to get hash from it 
//     const isValid = await user.comparePassword(password, user.password);
//     if (!isValid){
//         throw new Error ('UN_AUTH')
//     }
// //   const {SECRET}= process.env
//   const token=  jwt.sign({
//         username, _id: user.id,
//         maxAge : '3d' ,
//     }, "jkfkjjhfkdghfdkghdfkgnhl")
//     return token;

//     console.log(isValid);
// }
const login = async ({username,password} , next) => {
    const newUser = await User.findOne({username}).exec();
    if(!newUser)
    {
        next("Invalid User");
        return;
    }
    const validUser = await newUser.comparePassword(password); 
    console.log(validUser, newUser, password)
    if(!validUser){
        next ("Unuathorized user") 
        return;
    }
    else
    { 
       const token = jwt.sign({username, _id:newUser._id,
        maxAge:'1d'
    }, 'hf5246748sjnjdhdhhddnn')
    return token
    }
}





module.exports = { login, create};