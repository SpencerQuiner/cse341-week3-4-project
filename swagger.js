const swaggerAutogen = require('swagger-autogen')();

const doc ={
    info: {
        title: 'Tasks Api',
        description: 'API documentation for Task Manager project'
    },
    host: 'localhost:3000',
    schemes: ['https']
};

const outputfile = './swagger.json';
const endpointfiles = ['./routes/index.js'];

swaggerAutogen(outputfile, endpointfiles,doc);