const express = require('express')
const pool = require('../../mysql-connector')

const routerMediciones = express.Router()


//metodo para obtener la tabla de mediciones
routerMediciones.get('/', function (req, res) {
    pool.query('Select * from Mediciones', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
})

// metodo para obtener una medicion especifica
routerMediciones.get('/:id', function (req, res) {
    console.log("id",req.params.id)
    pool.query("Select * from Mediciones where medicionId="+req.params.id, function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
})

module.exports = routerMediciones
