const express = require("express");
const Route = express.Router();

const {
  variables: {
    route: {
      project,
      authRoute: { auth, register, login },
    },
  },
} = require("../../variables/variables");

const { registerController, loginController } = require("./auth_controller");

Route.post(`${project}${auth}${register}`, registerController);
Route.post(`${project}${auth}${login}`, loginController);

module.exports = Route;
