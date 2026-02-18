import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Attendance Management API",
      version: "1.0.0",
      description: "API Documentation for Attendance & HR System",
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Local",
      },
    ],
  },
  apis: ["./src/docs/**/*.ts"], // ⬅️ HANYA dari docs folder
};

export const swaggerSpec = swaggerJsdoc(options);
