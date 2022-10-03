const helper = require("../../helpers/wrapper");
const userModel = require("./user_model");

module.exports = {
  getAllUsersController: async (_req, res) => {
    try {
      const result = await userModel.getDataAll();
      return helper.response(res, 200, "Success get all users", result);
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
  getUserByIdController: async (req, res) => {
    try {
      const result = await userModel.getUserByCondition({ id: req.params.id });
      return helper.response(
        res,
        200,
        `Success get user by ID controller ${req.params.id}`,
        result
      );
    } catch (error) {
      console.log(error);
      return helper.response(res, 400, "Bad request", error);
    }
  },
  updateUserController: async (req, res) => {
    try {
      return helper.response(
        res,
        200,
        `Success update user id - ${req.decodeToken.id} - controller`
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
