const helper = require("../../helpers/wrapper");

module.exports = {
  getAllUsersController: async (req, res) => {
    try {
      return helper.response(res, 200, "Success get all users");
    } catch (error) {
      return helper.response(res, 400, "Bad request register controller");
    }
  },
  getUserByIdController: async (req, res) => {
    try {
      return helper.response(
        res,
        200,
        `Success get user by ID controller ${req.params.id}`
      );
    } catch (error) {
      return helper.response(res, 400, "Bad request login controller");
    }
  },
  updateUserController: async (req, res) => {
    try {
      return helper.response(
        res,
        200,
        `Success update user id - ${req.params.id} - controller`
      );
    } catch (error) {
      return helper.response(res, 400, "Bad update user controller");
    }
  },
  deleteUserController: async (req, res) => {
    try {
      return helper.response(
        res,
        200,
        `Success delete user - ${req.params.id} - controller`
      );
    } catch (error) {
      return helper.response(res, 400, "Bad delete user controller");
    }
  },
};
