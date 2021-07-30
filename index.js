const express = require('express');
const app = express();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
var servicio_routes = require('./src/routes/main');


app.use(express.json());
app.use('/', servicio_routes);

const PORT = process.env.PORT_ONE || 3000;

// Swagger conf
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Test Servicios',
            version: '0.1.0',
            description:
                'Esta API fue creada para test',
            license: {
                name: 'MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: 'Ludwin Burrión',
            },
        },
        servers: [{
            url: 'http://localhost:3000/',
        }],
    },
    apis: ['./src/documentacion/*.yml'],
};
const specs = swaggerJsdoc(options);
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true }),
);

app.listen(PORT, () => {
    console.log(`Servicio corriendo en el ${PORT}`);
})