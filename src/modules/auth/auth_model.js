const connection = require("../../config/mysql");
const {
  variables: {
    query: {
      authQuery: { register, getUserByCondition },
    },
  },
} = require("../../variables/variables");

module.exports = {
  register: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(register, data, (error, result) => {
        console.log(error);
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...data,
          };
          resolve(newResult);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
};
