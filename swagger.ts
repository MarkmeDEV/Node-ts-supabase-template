import swaggerJsdocs from "swagger-jsdoc"
// import swaggerUi from "swagger-ui-express"

const swaggerDefinitions = {
    openapi: '3.0.0',
    info: {
        title: "Node TS with Supabase Integration",
        description: "API Endpoints for mini project documented on swagger",
        contact: {
            name: "marklouisALTER",
            github: 'https://github.com/marklouisALTER',
            url: "https://markme-portfolio.vercel.app/",
        },
        version: "1.0.0",
    },
    servers: [ // <-- Note the plural here
        {
            url: "http://localhost:3001/",
            description: "Local Server",
        },
    ],
};


const options = {
    definition: swaggerDefinitions,
    apis: ['./src/routes/*.ts']
}

export const swaggerSpec = swaggerJsdocs(options);
