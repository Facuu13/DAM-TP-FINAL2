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

// Método para agregar un nuevo registro de log de riego
routerLogRiegos.put('/', function (req, res) {
    const { apertura, fecha, electrovalvulaId } = req.body;
    console.log(req.body);
    // Verificar si los datos requeridos están presentes
    if (!apertura || !fecha || !electrovalvulaId) {
        res.status(400).send("Faltan campos requeridos");
        return;
    }

    // Realizar la inserción en la base de datos
    pool.query("INSERT INTO Log_Riegos (apertura, fecha, electrovalvulaId) VALUES (?, ?, ?)", 
        [apertura, fecha, electrovalvulaId], 
        function(err, result, fields) {
            if (err) {
                res.status(500).send(err.message);
                return;
            }
            res.status(200).send();
        });
});

module.exports = routerLogRiegos
