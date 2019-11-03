const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://sam:cXbrKgqYb0iALGAn@cluster0-8dxwr.mongodb.net/test?retryWrites=true&w=majority",{ useUnifiedTopology: true,useNewUrlParser: true })
.then((resolve)=>{
  console.log("Connecte to Database");
})
.catch((reject)=>{
  console.log("Database could not be connected.");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin,content-type,X-Requested-With, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT, OPTIONS,DELETE,PATCH");
  next();
});
//
app.post('/api/posts',(req,res,next)=>{
  const post =new Post({
    title: req.body.title,
    content: req.body.content
  }) ;
  post.save().then( updatedPost => {
    res.status(201).json({
      message:"Post completed successfuly",
      postId: updatedPost._id
    })
  });


});

app.put( '/api/posts/:id', (req,res,next) => {
  console.log(req.params.id);
  const data = {
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  }
  Post.updateOne( {_id: req.params.id},data ).then( result => {
    console.log( result);
    res.status(200).json({message: 'Update successfully!'});
  })
});

app.get('/api/posts',(req,res,next)=>{
  Post.find()
  .then(documents => {
    res.status(200).json({message:'The post request is successful',posts: documents});
  })
});


app.delete('/api/posts/:id',( req,res ,next) => {
  Post.deleteOne( { _id: req.params.id })
    .then( result => {
      console.log( result );
      res.status(200).json({ message: 'Deleted'});
    })

});
module.exports = app;
