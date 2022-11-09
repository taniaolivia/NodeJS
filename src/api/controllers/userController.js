const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.userRegister = (req, res) => {
    let newUser = new User(req.body);

    newUser.save((error, user) => {
        if(error){
            res.status(401);
            console.log(error);
            res.json({message: "Rêquete invalide"});
        }
        else{
            res.status(200);
            res.json({message: `Utilisateur crée : ${user.email}`});
        }
    });
}

exports.userLogin = (req, res) => {
    // Find user
    User.findOne({email: req.body.email}, (error, user) => {
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Utilisateur non trouvé"});
        }
        else{
            if(user.email == req.body.email && user.password == req.body.password){
                // Password correct
                let userData = {
                    id: user.id,
                    email: user.email,
                    role: "admin"
                }

                jwt.sign(userData, process.env.JWT_KEY, {expiresIn: "30 days"}, (error, token) => {
                    if(error){
                        res.status(500);
                        console.log(error);
                        res.json({message: "Impossible de générer le token"})
                    }
                    else{
                        res.status(200);
                        res.json({token});
                    }
                });
            }
            else{
                // Password don't match
                res.status(401);
                console.log(error);
                res.json({message: "Email ou mot de passe incorrect"})
            }
        }
    })
}