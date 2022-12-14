const express = require("express");
const Route = express.Router();
const { authentication } = require("../../middleware/auth");

const {
  variables: {
    route: {
      project,
      userRoute: { user, getAllUsers, getUserById, updateUser, deleteUser },
    },
  },
} = require("../../variables/variables");

const {
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} = require("./user_controller");

Route.get(`${project}${user}${getAllUsers}`, getAllUsersController);
Route.get(`${project}${user}${getUserById}`, getUserByIdController);
Route.patch(
  `${project}${user}${updateUser}`,
  authentication,
  updateUserController
);
Route.delete(`${project}${user}${deleteUser}`, deleteUserController);

module.exports = Route;
