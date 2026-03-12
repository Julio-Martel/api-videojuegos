/*
    SIMULACION DE UNA API DE VIDEOJUEGOS 
*/

const express = require("express");
const app = express();
const videojuegos = require("./videojuegos/videojuegos");

app.use(express.json());

/*app.get("/videojuegos",(req,res) => {
    res.json(videojuegos);
})*/

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

const verificarCodigoVideojuego = (req,res,next) => {
    const codigo = parseInt(req.params.codigo);
    const buscarCodigo = videojuegos.find(v => v.codigo === codigo);

    if(!buscarCodigo){
        return res.status(404).json({
            mensaje: "Codigo de videojuego inexistente"
        })
    }

    next();
}

/*app.get("/videojuegos/:codigo", verificarCodigoVideojuego, (req,res) => {
    const codigo = parseInt(req.params.codigo);
    const posicionVideojuego = videojuegos.findIndex(v => v.codigo === codigo);

    res.status(200).json({
        mensaje: "Videojuego encontrado",
        videojuego: videojuegos[posicionVideojuego]
    })

});*/

app.put("/videojuegos/:codigo", verificarCodigoVideojuego, (req,res) => {
    const codigo = parseInt(req.params.codigo);
    const ubicarPosicionVideojuego = videojuegos.findIndex(v => v.codigo === codigo);

    videojuegos[ubicarPosicionVideojuego] = {
        codigo: codigo,
        nombre: req.body.nombre,
        plataforma: req.body.plataforma,
        precio: parseInt(req.body.precio),
        stock: parseInt(req.body.stock)
    }

    res.status(200).json({
        mensaje: "Videjuego actualizado"
    })
});

app.patch("/videojuegos/:codigo", verificarCodigoVideojuego, (req,res) => {
    const codigo = parseInt(req.params.codigo);
    const posicionVideojuego = videojuegos.findIndex(v => v.codigo === codigo);

    videojuegos[posicionVideojuego] = {
        ...videojuegos[posicionVideojuego],
        ...req.body
    }

    res.status(200).json({
        mensaje: "se ha actualizado el videojuego"
    })
})

app.delete("/videojuegos/:codigo", verificarCodigoVideojuego, (req,res) => {
    const codigo = parseInt(req.params.codigo);
    const posicionVideojuego = videojuegos.findIndex(v => v.codigo === codigo);

    videojuegos.splice(posicionVideojuego, 1);

    let i = 1;
    videojuegos.forEach(v => {
        v.codigo = i;
        i++; 
    });

    res.status(200).json({
        mensaje: "Videojuego borrado"
    })

})

app.get("/videojuegos", (req, res) => {

    const plataforma = req.query.plataforma;

    if (plataforma) {
        const filtrados = videojuegos.filter(v => v.plataforma === plataforma && v.precio > 60);
        return res.json(filtrados);
    }

    res.json(videojuegos);

});

app.listen(3000,() => {
    console.log("Servidor activo");
})