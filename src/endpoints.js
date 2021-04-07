const fs = require("fs");
module.exports = function (app) {
  /* Create - GET method */
  app.get("/user/list", (req, res) => {
    /* #swagger.tags = ['Users']
       #swagger.description = 'Endpoint para obtener todos los usuarios.'
    */

    const users = readJson();
    console.log(req);
    /* #swagger.responses[200] = { 
               schema: { $ref: "#/definitions/Users" },
               description: 'Usuários' 
        } */
    res.status(200).send(users);
  });

  /* Create - POST method */
  app.post("/user/add", (req, res) => {
    /* #swagger.tags = ['Users']
       #swagger.description = 'Endpoint para agregar un usuario.'
    */

    const users = readJson("users.json");

    // obtener los nuevos datos de usuario de la solicitud de publicación
    /* #swagger.parameters['newUser'] = {
            in: 'body',
            description: 'Información del usuario.',
            required: true,
            type: 'object' ,
            schema: { $ref: "#/definitions/AddUser" }
          }
    } */
    const userData = req.body;

    // // comprobar si faltan los campos userData

    if (
      userData.fullname == null ||
      userData.age == null ||
      userData.username == null ||
      userData.password == null
    ) {
      /* 
      #swagger.responses[401] = { 
        description: 'Falta información para crear el usuario',
        schema: { $ref: "#/definitions/AddUser_missingData" } 
      }
      */
      return res.status(401).send({ error: true, msg: "User data missing" });
    }

    // comprobar si el nombre de usuario ya existe
    const findExist = users.find((user) => user.username === userData.username);
    if (findExist) {
      /* 
        #swagger.responses[409] = { 
          description: 'Usuario ya existe',
          schema: { $ref: "#/definitions/AddUser_Exists" }  
        }
      */
      return res
        .status(409)
        .send({ error: true, msg: "Username already exist" });
    }

    users.push(userData);

    writeJson(users);
    /* 
      #swagger.responses[200] = { 
        description: 'Usuario agregado exitosamente',
        schema: { $ref: "#/definitions/AddUser_Ok" }  
      }
    */
    res.status(200).send({ success: true, msg: "User added successfully" });
  });

  app.delete("/user/delete/:username", (req, res) => {
    /* #swagger.tags = ['Users']
       #swagger.description = 'Endpoint para eliminar por usuario.'
    */
    const { username } = req.params;

    const users = readJson("users.json");

    const newUsers = users.filter((user) => user.username !== username);

    if (users.length === newUsers.length) {
      /* 
        #swagger.responses[410] = { 
          description: 'Usuario no existe',
          schema: { $ref: "#/definitions/Not_exists_user" }  
        }
      */
      return res
        .status(410)
        .send({ error: true, msg: "Username does not exist" });
    }

    writeJson(newUsers);
    /* 
        #swagger.responses[200] = { 
          description: 'Usuario eliminado exitosamente',
          schema: { $ref: "#/definitions/Removed_user" }  
        }
      */
    res
      .status(200)
      .send({ success: true, msg: `User ${username} removed successfully` });
  });

  app.put("/user/update/:username", (req, res) => {
    /* #swagger.tags = ['Users']
       #swagger.description = 'Endpoint para editar por usuario.'
    */
    const { username } = req.params;

    const users = readJson("users.json");

    const { password, fullname, age } = req.body;

    const findUser = users.find((user) => user.username === username);

    if (!findUser) {
      /* 
        #swagger.responses[409] = { 
          description: 'Usuario no existe',
          schema: { $ref: "#/definitions/Not_exists_user" }  
        }
      */
      return res
        .status(409)
        .send({ error: true, msg: "Username does not exist" });
    }

    //Se agrega la nueva data, en caso de no venir en el body se deja la misma
    findUser.password = password !== undefined ? password : findUser.password;
    findUser.fullname = fullname !== undefined ? fullname : findUser.fullname;
    findUser.age = age !== undefined ? age : findUser.age;

    writeJson(users);

    /* 
        #swagger.responses[200] = { 
          description: 'Usuario editado exitosamente',
          schema: { $ref: "#/definitions/Updated_successfully" }  
        }
      */
    res
      .status(200)
      .send({ success: true, msg: `User ${username} updated successfully ` });
  });

  app.delete("/user/deleteall", (req, res) => {
    /* #swagger.tags = ['Users']
       #swagger.description = 'Endpoint para eliminar todos los usuario.'
    */
    writeJson([]);
    /* 
        #swagger.responses[200] = { 
          description: 'Todos los usuarios eliminados exitosamente',
          schema: { $ref: "#/definitions/All_users_removed" }  
        }
      */ 7;

    res
      .status(200)
      .send({ success: true, msg: `All users removed successfully` });
  });
};

/* util functions */
//read the user data from json file
const writeJson = (data, filename = "users.json") => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(`./data/${filename}`, stringifyData);
};
//get the user data from json file
const readJson = (filename = "users.json") => {
  const jsonData = fs.readFileSync(`./data/${filename}`);
  return JSON.parse(jsonData);
};
/* util functions ends */
