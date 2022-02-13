const mongoose= require ('mongoose')
var AutoIncrement = require('mongoose-sequence')(mongoose);

const articleSchema = new mongoose.Schema ({
    // postID: { type: Number ,  default: 0},
    title: {
        type: String,
        required:[true ,'Title is required'],
        minlength:[5,'Title should be at least 5 charachters'],
        maxlength: [100,`Title can't be more than 20 charachters`],
    },
    description: {
        type:String,
        required: [true ,'Post body is required'],
      minlength: [3 , 'post should be at least 30 characters']
    },
    // tags: [{
    //     type: String,
    //     match: [/^[a-zA-Z]{3,8}$/ , `each tag should be charachters only , not less than 3 or more than 8`]
    //   }],
    createdAt: {
      type: Date,
      default: Date.now
  },
    image:{
        type:String
      },
      user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:'User'
    },
},
{Timestamps:true}
)
articleSchema.pre('findOneAndUpdate', function(next) {
    this.options.runValidators = true;
    next();
  });
  
  articleSchema.pre('save', function() {
    console.log(this); //user document
  });
  
  articleSchema.plugin(AutoIncrement, {inc_field: 'postID'});
 module.exports = mongoose.model('Article', articleSchema)