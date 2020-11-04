const express = require ("express");
const bodyparser = require("body-parser");
const app = express();
const methodoverride = require("method-override");

const router = express.Router();
const mongoose = require('mongoose');
 const personaModel= require("./personaModel");
 const publicacionModel=require("./publicacionModel");
 const usuarioModel=require("./usuarioModel");
 const { json } = require("body-parser");
app.use(bodyparser.urlencoded({extended:false}));

mongoose.connect('mongodb://localhost:27017/angular2020',(err , res)=> {
    if  (err) throw err;
    console.log('conexion exitosa')
});

app.use(bodyparser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(methodoverride());

app.use(bodyparser.json( {limit :'50mb'}));

app.listen(3000,()=>{console.log('servidor');

});




router.get("/persona",(req,res) => {console.log('servicio funcionando');
personaModel.find({},(error, respuesta)=>{
    
    if(error)res.send({estado:{codigo:0,respuesta:err.message}});
    res.send({estado:{codigo:0,respuesta:'buscar todos exitoso'},personas:respuesta});

  });
});

router.get("/persona/:id",(req,res) => {console.log('servicio get id funcionando');
    personaModel.findById(req.params.id, (err, retorno)=>{
        retorno.save( (err,respuesta) => {
            if(err) res.send({estado:{codigo:0,respuesta:err.message}});
            res.send({estado:{codigo:0,respuesta:'buscar por ID exitoso'},persona:retorno});
        });
    });

});



router.post("/persona",(req,res) => {console.log('servicio post funcionando');
   
var miobjetoAdd = new personaModel();
    miobjetoAdd.nombre =req.body.nombre;
    miobjetoAdd.apellido = req.body.apellido;
    miobjetoAdd.edad = req.body.edad;
    miobjetoAdd.IsProfesional = true;

    miobjetoAdd.save( (err,respuesta) => {
        if(err) res.send({estado:{codigo:0,respuesta:err.message}});
        res.send({estado:{codigo:0,respuesta:'sos un genio'},persona:respuesta});
    });
});

router.put("/persona/:id",(req,res) => {console.log('servicio put funcionando');
   
personaModel.findById(req.params.id, (err, retorno)=>{
        retorno.nombre =req.body.nombre;
        retorno.apellido = req.body.apellido;
        retorno.edad = req.body.edad;
        retorno.IsProfesional = true;
        
        retorno.save( (err,respuesta) => {
            if(err) res.send({estado:{codigo:0,respuesta:err.message}});
            res.send({estado:{codigo:0,respuesta:'modificacion exitosa'},persona:respuesta});
        });
    });

});

router.delete("/persona/:id",(req,res) => {console.log('servicio delete funcionando');
personaModel.findById(req.params.id, (err, retorno)=>{
        retorno.remove( (err,respuesta) => {
        if(err) res.send({estado:{codigo:0,respuesta:err.message}});
        res.send({estado:{codigo:0,respuesta:'modificacion exitosa'},persona:respuesta});
    });
});


router.post("/usuario",(req,res) => {console.log('servicio postUsuario funcionando');
   
var miUsuarioAdd = new usuarioModel();
miUsuarioAdd.nombre =req.body.nombre;
miUsuarioAdd.password = req.body.password;
  

miUsuarioAdd.save( (err,respuesta) => {
        if(err) res.send({estado:{codigo:0,respuesta:err.message}});
        res.send({estado:{codigo:0,respuesta:'mi usuario funcionando'},usuario:respuesta});
    });
});

router.get("/usuario",(req,res) => {console.log('servicio usuario funcionando');
usuarioModel.find({},(error, respuesta)=>{
    
    if(error)res.send({estado:{codigo:0,respuesta:err.message}});
    res.send({estado:{codigo:0,respuesta:'buscar todos los uauarios exitoso'},usuarios:respuesta});

  });
});

});


app.use(router);