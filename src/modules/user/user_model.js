const connection = require("../../config/mysql");
const {
  variables: {
    query: {
      authQuery: { getUserByCondition },
      userQuery: { getAllUsers },
    },
  },
} = require("../../variables/variables");

module.exports = {
  getDataAll: () => {
    return new Promise((resolve, reject) => {
      connection.query(getAllUsers, (error, result) => {
        !error ? resolve(result) : reject(new Error(error));
      });
    });
  },
  getUserByCondition: (condition) => {
    return new Promise((resolve, reject) => {
      connection.query(getUserByCondition, condition, (error, result) => {
        !error ? resolve(result) : reject(new Error(error));
      });
    });
  },
};
