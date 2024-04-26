const express = require('express')
const pool = require('../../mysql-connector')

const routerLogRiegos = express.Router()


//metodo para obtener la tabla de mediciones
routerLogRiegos.get('/', function (req, res) {
    pool.query('Select * from Log_Riegos', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
})

// metodo para obtener una medicion especifica
routerLogRiegos.get('/:id', function (req, res) {
    console.log("id",req.params.id)
    pool.query("Select * from Log_Riegos where logRiegoId="+req.params.id, function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
})

module.exports = routerLogRiegos
