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

// Método para agregar un nuevo valor en mediciones
routerMediciones.post('/', function (req, res) {
    const { fecha, valor, dispositivoId } = req.body;
    console.log(req.body);
    // Verificar si los datos requeridos están presentes
    if (!fecha || !valor || !dispositivoId) {
        res.status(400).send("Faltan campos requeridos");
        return;
    }

    // Realizar la inserción en la base de datos
    pool.query("INSERT INTO Mediciones (fecha, valor, dispositivoId) VALUES (?, ?, ?)", 
        [fecha, valor, dispositivoId], 
        function(err, result, fields) {
            if (err) {
                res.status(500).send(err.message);
                return;
            }
            res.status(200).send();
        });
});

module.exports = routerMediciones
