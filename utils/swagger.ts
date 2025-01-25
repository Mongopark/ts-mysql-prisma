import { Request, Response, NextFunction, Application } from "express";
import swaggerUI from "swagger-ui-express";
import { version } from "package.json";
import swaggerJSDoc from "swagger-jsdoc";
import { configs } from "config/app.config";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Imprxx Swagger Doc",
      version,
    },
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
  //apis: ["./dist/**/*.router.js"],
  apis: ["./lib/**/*.router.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export function swaggerDocs(app: Application, port: number) {
  app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

  app.get("docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`Swagger Doc available at ${configs.API_DOMAIN}/swagger`);
}
