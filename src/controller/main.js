var Servicios = require('../servicios/service')

async function busqueda(req,res){
    var busqueda = req.query.busqueda;
    const url =`https://itunes.apple.com/search?term=${busqueda}`;
    data = await Servicios.Consumir(url);
    console.log(data);
    respuesta = {
        error: true,
        codigo: 200,
        data :"FFF"
    }
    res.send(respuesta);
}

module.exports = {
    busqueda
};