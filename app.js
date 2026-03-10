const express = require("express");
const app = express();
const videojuegos = require("./videojuegos/videojuegos");

app.use(express.json());

app.get("/videojuegos",(req,res) => {
    res.json(videojuegos);
})

const verificarCodigoVideojuego = (req,res,next) => {
    const codigo = parseInt(req.params.codigo);
    const buscarCodigo = videojuegos.find(v => v.codigo === codigo);

    if(!buscarCodigo){
        res.status(204).json({
            mensaje: "Codigo de videojuego inexistente"
        })
    }

    next();
}

const verificarNombreDelJuego = (req,res,next) => {
    const nombre = req.body.nombre;
    const verificarNombreDuplicado = videojuegos.find(v => v.nombre === nombre);

    if(verificarNombreDuplicado){
       return res.status(409).json({
            mensaje:"El nombre del libro ya existe"
        })
    }

    next()
}

app.post("/videojuegos",verificarNombreDelJuego,(req,res) => {
   
    const nuevoJuego = {
        codigo: videojuegos.length + 1,
        nombre: req.body.nombre,
        plataforma: req.body.plataforma,
        precio: req.body.precio,
        stock: req.body.stock
    }   

    videojuegos.push(nuevoJuego);

    res.status(200).json({
        mensaje: "Videojuego añadido a la base de datos"
    });

})

app.listen(3000,() => {
    console.log("Servidor activo");
})