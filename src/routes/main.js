var express = require('express');
var registry = require('../servicios/registry.json');
const axios = require('axios')
var router = express.Router();

/**
*@swagger
*tags:
*    name: Product
*    description: Api para interactuar en el consumo de servicios
*/


function consumirservicio(servicio,busqueda) {
    console.log("valor ingresado", busqueda,servicio.url+busqueda);
    const resultado = axios(servicio.url+busqueda)
    return resultado;
}



router.all('/servicio', (req, res) => {
    const busqueda = req.query.busqueda || '';
    var solucion = false;
    if(busqueda===''){
        res.status(400).send("Debe ingresar el criterio de busqueda");
    }
    var p = [];
    for (let index = 0; index < registry.services.length; index++) {
        p.push(index);
    }
    p.reduce(
        function (sequence, value) {
            return sequence.then(function () {
                servicio = registry.services[value]
                if (!solucion)
                    return consumirservicio(servicio,busqueda);
            }).then(function (obj) {
                if (obj != undefined) {
                    var data = obj['data'];
                    if(servicio.data != "")
                        data = data[servicio.data]
                    
                    if(data.length>0){
                        solucion = true;
                        res.send(data);
                    }
                }
                return;
            });
        },
        Promise.resolve()
    ).then(function () {
        if (!solucion){
            res.send({
                "data": []
            })
        }
    });
})

module.exports = router;