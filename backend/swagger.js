const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0', // OpenAPI 3.0 specification
        info: {
            title: 'SIRQU API',
            version: '1.0.0',
            description: 'API documentation for the user authentication and management system.',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Local Development Server Sirqu',
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        tags: [
            { name: 'Auth' },
            { name: 'User' },
            { name: 'Categories' },
            { name: 'Products' },
            { name: 'Outlets' },
            { name: 'Kasir' },
            { name: 'Transaksi' },
            { name: 'Belanja' },
        ],
        security: [{ BearerAuth: [] }],
    },
    apis: ['./routes/*.js'], // Specify the path to your route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Swagger setup function
module.exports = (app) => {
    app.use('/api-sirqu', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
