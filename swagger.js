const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/endpoints.js"];

const doc = {
  info: {
    version: "1.0.0",
    title: "Practica realizando CRUD con express",
    description:
      "Documentación generada automáticamente por el módulo <b>swagger.autogen</b>.",
  },
  host: "localhost:5000",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "Users",
      description: "Endpoints",
    },
  ],
  definitions: {
    Users: [
      {
        username: "ricardo",
        password: "1234",
        fullname: "ricardo gatti acosta",
        age: 4,
      },
    ],
    AddUser: {
      username: "marcos",
      password: "4321",
      fullname: "marcos gatti soto",
      age: 37,
    },
    AddUser_Ok: {
      success: true,
      msg: "User added successfully",
    },
    AddUser_Exists: { error: true, msg: "Username already exist" },
    AddUser_missingData: { error: true, msg: "User data missing" },
    Not_exists_user: { error: true, msg: "Username does not exist" },
    Removed_user: {
      success: true,
      msg: "User :username removed successfully",
    },
    Updated_successfully: {
      success: true,
      msg: `User :username updated successfully `,
    },
    All_users_removed: { success: true, msg: `All Users removed successfully` },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./index.js");
});
