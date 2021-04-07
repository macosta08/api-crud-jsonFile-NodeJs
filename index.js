const express = require("express");
const PORT = process.env.PORT || 5000;

const app = express();

//Las siguientes 2 lineas requeridas para usar SWAGGER
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

// esta línea es necesaria para analizar el cuerpo de la solicitud
//this line is required to parse the request body
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Escuchando el puerto ${PORT}`);
});

//Ruta donde se verá la documentación
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

require("./src/endpoints")(app);
