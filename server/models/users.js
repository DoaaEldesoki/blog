const mongoose = require('mongoose')
const bycrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    username:{
        type :String,
        required:[true,'username is required'],
        unique:[true,'duplicated username'],
        minlength: [6, 'minimum length is 6'],
        maxlength:[10,'maxlenght is 10 ']
    },
    FirstName:{
        type:String,
        // required:true,
        minlength:[4, 'Name is short! min is 4'],
        maxlength:15,
    },
    LastName:{
        type:String,
        // required:true,
        minlength:[3, 'Name is short! min is 3'],
        maxlength:15
    },
    password:{
       type: String,
       required:[true, "password is required"],
       minlength:[5,'password too short'],
       maxlength:[15, 'maxlenght is 15']
    },
    Email: {
        type:String,
        // required:true,
    },
},
{
   toJSON: {
    transform: (doc, ret, options) => {
        delete ret.password;
        delete ret.__v;
        return ret;
    },
   }
}
)
//password middleware
userSchema.pre('save', function() {
    console.log(this); //user document
    const hash = bycrypt.hashSync(this.password,10)
    this.password = hash;
    // return this;
  });
//   userSchema.pre('findOneAndUpdate', function(next) {
//     this.options.runValidators = true;
//     next();
//   });
  userSchema.methods.comparePassword = function (password) {
    return bycrypt.compareSync(password, this.password);
  };
  
module.exports= mongoose.model('User', userSchema)
