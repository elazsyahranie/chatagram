const helper = require("../../helpers/wrapper");

const authModel = require("./auth_model");
const userModel = require("../user/user_model");

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

      const whitespaceFinder = /\s/;
      const checkWhitespace = whitespaceFinder.test(user_name);

      if (checkWhitespace) {
        return helper.response(res, 400, "Username should not contain spacing");
      } else {
        const setData = {
          user_name: user_name,
          user_email: user_email,
          user_password: encryptPassword,
          user_phone: user_phone,
          user_bio: user_bio,
        };

        const checkEmailUser = await userModel.getUserByCondition({
          user_email: user_email,
        });

        const checkUsername = await userModel.getUserByCondition({
          user_name: user_name,
        });

        if (checkEmailUser.length === 0 && checkUsername.length === 0) {
          const result = await authModel.register(setData);
          return helper.response(res, 200, "Registration succesful", result);
        } else if (checkEmailUser.length > 0 && checkUsername.length === 0) {
          return helper.response(res, 400, "Email already registered");
        } else if (checkEmailUser.length === 0 && checkUsername.length > 0) {
          return helper.response(res, 400, "Username already used");
        } else if (checkEmailUser.length > 0 && checkUsername.length > 0) {
          return helper.response(res, 400, "Email and username already used");
        }
      }
    } catch (error) {
      console.log(error);
      return helper.response(res, 400, "Bad Request", error);
    }
  },
  loginController: async (req, res) => {
    try {
      // console.log(req.body)
      const { user_email_or_name, user_password } = req.body;
      const checkUserEmail = await userModel.getUserByCondition({
        user_email: user_email_or_name,
      });

      const checkUsername = await userModel.getUserByCondition({
        user_name: user_email_or_name,
      });

      // console.log(checkUserEmail);
      // console.log(checkUsername);

      if (checkUserEmail.length > 0 || checkUsername.length > 0) {
        const checkPassword = bcrypt.compareSync(
          user_password,
          checkUserEmail.length > 0 && checkUsername.length === 0
            ? checkUserEmail[0].user_password
            : checkUserEmail.length === 0 && checkUsername.length > 0
            ? checkUsername[0].user_password
            : null
        );

        if (checkPassword) {
          console.log("User berhasil login");
          const payload =
            checkUserEmail.length > 0 && checkUsername.length === 0
              ? checkUserEmail[0]
              : checkUserEmail.length === 0 && checkUsername.length > 0
              ? checkUsername[0]
              : null;
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
          return helper.response(
            res,
            400,
            "Incorrect username/email or password"
          );
        }
      }
      if (checkUserEmail.length === 0 && checkUsername.length === 0) {
        return helper.response(
          res,
          400,
          "Incorrect username/email or password"
        );
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request", error);
    }
  },
};
