const express = require('express')
const pool = require('../../mysql-connector')

const routerElectrovalvulas = express.Router()

routerElectrovalvulas.get('/', function (req, res) {
    pool.query('Select * from Electrovalvulas', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
})

// metodo para obtener un dispositivo especifico
routerElectrovalvulas.get('/:id', function (req, res) {
    console.log("id",req.params.id)
    pool.query("Select * from Electrovalvulas where electrovalvulaId="+req.params.id, function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
})

module.exports = routerElectrovalvulas