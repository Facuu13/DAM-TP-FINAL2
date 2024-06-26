const express = require('express')
const pool = require('../../mysql-connector')

const routerDispositivo = express.Router()

//metodo para obtener un dispositivo especifico
routerDispositivo.get('/', function (req, res) {
    pool.query('Select * from Dispositivos', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
})

// metodo para obtener un dispositivo especifico
routerDispositivo.get('/:id', function (req, res) {
    console.log("id",req.params.id)
    pool.query("Select * from Dispositivos where dispositivoID="+req.params.id, function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
})


module.exports = routerDispositivo