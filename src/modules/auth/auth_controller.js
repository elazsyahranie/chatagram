const helper = require("../../helpers/wrapper");

module.exports = {
  registerController: async (req, res) => {
    try {
      return helper.response(res, 200, "Success register controller");
    } catch (error) {
      return helper.response(res, 400, "Bad request register controller");
    }
  },
  loginController: async (req, res) => {
    try {
      return helper.response(res, 200, "Success login controller");
    } catch (error) {
      return helper.response(res, 400, "Bad request login controller");
    }
  },
};
