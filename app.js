const express = require("express");
const app = express();
const videojuegos = require("./videojuegos/videojuegos");

app.use(express.json());





app.listen(3000,() => {
    console.log("Servidor activo");
})