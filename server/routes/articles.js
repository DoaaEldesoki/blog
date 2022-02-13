const express = require('express')
const Article = require ('./../models/articles')
const req = require('express/lib/request');
const imgMiddleware = require ('../middleWares/uploadImgMiddleware')
const router = express.Router()
const {create} = require('../controllers/articles')
//  import  {create} from require ('../controllers/articles')

router.get('/',async (req, res, next) => {
    var userId = req.user._id
    const userNewPost = await Post.find({user:userId}).populate( {path: 'user', select: 'username -_id'})
    res.json({ "Response":"sucsess" ,'Data':userNewPost});    
});

router.get('/:id',async (req, res, next) => {
    const { id } = req.params;
    const userPost = Post.findOne({user:req.user._id , _id:id }).populate( {path: 'user', select: 'username -_id'})
    .then (data => { res.json({ "Response":"success" ,'Data':data}) }) 
    .catch(err => next("Id not found"))
});

router.post('/',async (req,res,next)=> {
    console.log(req.body)
    const body = req.body;

    create(body).then(data => res.json(data)).catch(err=> next(err));

})

// postroute.post('/Newpost/POST', async(req, res, next) => {

//     const body = req.body;

//      create(body).then(data => res.json(data)).catch(err=> next(err));
//   }

//   );
// router.post('/', imgMiddleware.single('image') ,async(req, res, next) => {
//     const newPost = req.body;
//     try{ 
//         if(req.file) { newPost.image = req.file.path ; newPost.user = req.user.id}
//         console.log(newPost.image , newPost.user)
//         const userNewPost = await Post.create(newPost)  /
//         res.json({"Response":"success" ,'Data':userNewPost});
//     }
//     catch(error){
//         next(error.message);
//     } 
// });
router.delete('/:id' , async (req,res,next) => {
    const { id } = req.params;
    var userId = req.user._id;
    let postDocument = Post.findOne({_id:id})
    .then(data => { if(data.user.equals(userId)) 
        { 
            const deleted = Post.deleteOne({ _id:id })
            .then(res.json({"Response":"success",'Data':data}))
            .catch(err=> next(err.message))
             
        } 
    })
    .catch(err => next("Id not found") )  
})

router.patch('/:id' , async (req,res,next) => {
    const { id } = req.params;
    const {title ,description , tags, image} = req.body;
    const postDocument = Post.findById(id)
    .then(data => { if(data.user.equals(req.user._id)) {  
        const updateDoc = Post.findOneAndUpdate({_id:id},{title ,description , tags, image},{ new: true }).exec()
        .then(newData => res.json(newData))
        .catch(err => next(err.message)) 
        } 
    })
    .catch(err => next(err.message) )  
})


module.exports= router