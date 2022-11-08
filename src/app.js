const express = require("express");

const hostname = "0.0.0.0";
const port = 3000;

const server = express();

server.get("/", (req, res) => {
    res.type("html");
    res.status(200);
    res.end("Home");
});

server.get("/posts", (req, res) => {
    res.type("html");
    res.status(200);
    res.end("Liste des articles");
});

server.post("/posts", (req, res) => {
    res.type("html");
    res.status(201);
    res.end("Articles crée");
});

server.get("/posts/:id", (req, res) => {
    res.type("html");
    res.status(200);
    res.end(`Article ${req.params.id}`);
});

server.listen(port, hostname);

