const Post = require("../models/postModel");

exports.listAllPosts = (req, res) => {
    Post.find({}, (error, posts) => {
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur"});
        }
        else{
            res.status(200);
            res.json(posts);
        }
    });
}

exports.createAPost = (req, res) => {
    let newPost = new Post(req.body);

    newPost.save((error, post) => {
        if(error){
            res.status(401);
            console.log(error);
            res.json({message: "Rêquete invalide"});
        }
        else{
            res.status(200);
            res.json(post);
        }
    });
}

exports.getAPost = (req, res) => {
    Post.find({_id: req.params.post_id}, (error, post) => {
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur"});
        }
        else{
            res.status(200);
            res.json(post);
        }
    })
}

exports.deleteAPost = (req, res) => {
    Post.deleteOne({_id: req.params.post_id}, (error, post) => {
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur"});
        }
        else{
            res.status(200);
            res.json(post);
        }
    })
}