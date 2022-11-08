const Comment = require("../models/CommentModel");

// Afficher la liste de tous les commentaires
exports.listAllComments = (req, res) => {
    Comment.find({post_id: req.params.post_id}, (error, comments) => {
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur"});
        }
        else{
            res.status(200);
            res.json(comments);
        }
    });
}

// Créer un commentaire
exports.createAComment = (req, res) => {
    Comment.findById(req.params.post_id, (error, comment) => {
        if(error){
            res.status(401);
            console.log(error);
            res.json({message: "Rêquete invalide"});
        }
        else{
            let newComment = new Comment({...req.body, post_id: req.params.post_id});

            newComment.save((error, comment) => {
                if(error){
                    res.status(401);
                    console.log(error);
                    res.json({message: "Rêquete invalide"});
                }
                else{
                    res.status(200);
                    res.json(comment);
                }
            })
        }
    });
}

// Supprimer tous les commentaires
exports.deleteAllComments = (req, res) => {
    Comment.deleteMany({}, (error) => {
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur"});
        }
        else{
            res.status(200);
            res.json({message: "Commentaires supprimés"});
        }
    })
}

// Afficher un commentaire par id
exports.getAComment = (req, res) => {
    Comment.findById(req.params.comment_id, (error, comment) => {
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur"});
        }
        else{
            res.status(200);
            res.json(comment);
        }
    })
}

// Supprimer un commentaire par id
exports.deleteAComment = (req, res) => {
    Comment.deleteOne({_id: req.params.comment_id}, (error) => {
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur"});
        }
        else{
            res.status(200);
            res.json({message: "Commentaire supprimé"});
        }
    })
}

// Modifier un commentaire
exports.updateAComment = (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body, {new: true}, (error, comment) => {
        if(error){
            res.status(401);
            console.log(error);
            res.json({message: "Rêquete invalide"});
        }
        else{
            res.status(200);
            res.json(comment);
        }
    });
}