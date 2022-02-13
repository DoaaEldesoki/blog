const path = require('path');
const multer = require('multer');

let storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    },
    filename:function(req,file,cb){
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})
var upload = multer({
    storage:storage ,
    fileFilter: function(req,file,callback){
        if(
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
            ){
                callback(null,true)
            }
            else{  
                  console.log("not supported file format")
                  callback(Error ('I don\'t have a clue!'))
                }
    },
    // limits:{ fileSize: 1024*1024*400 }
})

module.exports = upload;