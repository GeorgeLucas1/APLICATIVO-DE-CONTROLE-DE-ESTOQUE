import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Estoque",
      version: "1.0.0",
      description: "Documentação da API de controle de estoque",
    },
    servers: [
      {
        url: "http://localhost:3333/api",
        description: "servidor back-end local",
      },
    ],
  },
  // Onde o swagger vai procurar os comentários de documentação
  apis: ["./src/modules/**/**.routes.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);