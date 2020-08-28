//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "Welcome to My Writing. It is Web based app created for general purpose writing needs. This app is free to use and offers different features. You can use this app to Use it as your diary, Write your daily logs or May be as your to-do list. There are many ways to use it. I will rollout further updates. Please do provide your feedback as it is most needed in development. GO AHEAD USE IT AS YOU WISH";
const aboutContent = "My Writing is a general purpose Web based writing app. The app was created keeping in mind different needs of the users. This app uses different web technologies to serve its purpose. This app is free to use and offers different features. You can use this app to write your heart out and use it as your diary, Write your daily logs, writng summary of your lessons, take short notes or May be as your to-do list. There are many ways to use it. I will also rollout further updates. Go to Compose section and compose your first feed";
const contactContent = "Contact me for any quiries or any assisstance needed OR just fancy saying Hi! on my Email: niketsahai14@gmail.com or contact me on my phone number: 8587070563";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
