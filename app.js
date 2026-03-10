const express = require("express");
const app = express();
const videojuegos = require("./videojuegos/videojuegos");

app.use(express.json());

app.get("/videojuegos",(req,res) => {
    res.json(videojuegos);
})

app.post("/videojuegos/:codigo",verificarCodigoVideojuego,(req,res) => {
    
})

app.listen(3000,() => {
    console.log("Servidor activo");
})