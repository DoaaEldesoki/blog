const Article = require('../models/articles');
const jwt = require('jsonwebtoken')


const create=(article)=>Article.create(article);
const find =(q)=> Article.find(q).sort({date:1}).populate('user');
const findByID= ({id})=>Article.findOne({_id:id});
const update =({title} ,body)=>Post.findOneAndUpdate({userName:userName},{$set:{}})
// const deleteone =({userName})=>Post.findOneAndDelete({userName:userName});

module.exports={create,find,findByID} ;