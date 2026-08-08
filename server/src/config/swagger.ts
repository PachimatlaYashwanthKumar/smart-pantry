import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Smart Pantry API",
      version: "1.0.0",
      description:
        "REST API documentation for Smart Pantry",
    },

    servers: [
      {
        url: "http://localhost:5000/api/v1",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["src/routes/*.ts"],
};

const swaggerSpec =
  swaggerJsdoc(options);

export function setupSwagger(
  app: Express
) {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
  );
}