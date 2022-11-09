const Post = require("../models/postModel");
const axios = require("axios");

// Afficher la liste de tous les posts
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

// Créer un post
exports.createAPost = (req, res) => {
    axios.get("https://loripsum.net/api/plaintext").then(result => {
        const data = result.data;
        const content = data.replace(/[\n\r]/g, '');

        let newPost = new Post({title: req.body.title, content: content});

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
    });
}

// Supprimer tous les posts
exports.deleteAllPosts = (req, res) => {
    Post.deleteMany({}, (error) => {
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur"});
        }
        else{
            res.status(200);
            res.json({message: "Articles supprimés"});
        }
    })
}

// Afficher un post par id
exports.getAPost = (req, res) => {
    Post.findOne({_id: req.params.post_id}, (error, post) => {
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

// Supprimer un post par id
exports.deleteAPost = (req, res) => {
    Post.deleteOne({_id: req.params.post_id}, (error) => {
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur"});
        }
        else{
            res.status(200);
            res.json({message: "Article supprimé"});
        }
    })
}

// Modifier un post
exports.updateAPost = (req, res) => {
    Post.findByIdAndUpdate(req.params.post_id, req.body, {}, (error, post) => {
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