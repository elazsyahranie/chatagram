const helper = require("../../helpers/wrapper");
const authModel = require("./auth_model");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// const dataRefreshToken = {};

module.exports = {
  registerController: async (req, res) => {
    try {
      const { user_name, user_email, user_password, user_phone, user_bio } =
        req.body;
      const salt = bcrypt.genSaltSync(10);
      const encryptPassword = bcrypt.hashSync(user_password, salt);
      const setData = {
        user_name: user_name,
        user_email: user_email,
        user_password: encryptPassword,
        user_phone: user_phone,
        user_bio: user_bio,
      };

      const checkEmailUser = await authModel.getUserByCondition({
        user_email: user_email,
      });

      if (checkEmailUser.length === 0) {
        const result = await authModel.register(setData);
        return helper.response(res, 200, "Registration succesful", result);
      } else {
        return helper.response(res, 400, "Email already registered");
      }
    } catch (error) {
      console.log(error);
      return helper.response(res, 400, "Bad Request", error);
    }
  },
  loginController: async (req, res) => {
    try {
      // console.log(req.body)
      const { user_email, user_password } = req.body;
      const checkUserEmail = await authModel.getUserByCondition({
        user_email: user_email,
      });

      if (checkUserEmail.length > 0) {
        const checkPassword = bcrypt.compareSync(
          user_password,
          checkUserEmail[0].user_password
        );

        if (checkPassword) {
          console.log("User berhasil login");
          const payload = checkUserEmail[0];
          delete payload.user_password;
          delete payload.user_pin;
          const token = jwt.sign({ ...payload }, process.env.PRIVATE_KEY, {
            expiresIn: "12h",
          });
          const refreshToken = jwt.sign(
            { ...payload },
            process.env.PRIVATE_KEY,
            {
              expiresIn: "24h",
            }
          );
          // dataRefreshToken[checkUserEmail[0].user_id] = refreshToken;
          const result = { ...payload, token, refreshToken };
          return helper.response(res, 200, "Login succesful!", result);
        } else {
          return helper.response(res, 400, "Password incorrect");
        }
      } else {
        return helper.response(res, 404, "Email not found! Please register!");
      }
    } catch (error) {
      console.log(error);
      return helper.response(res, 400, "Bad Request", error);
    }
  },
};
