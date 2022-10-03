const variables = {
  route: {
    project: "/chatagram_backend",
    authRoute: { auth: "/auth", register: "/register", login: "/login" },
    userRoute: {
      user: "/user",
      getAllUsers: "/get-all-users",
      getUserById: "/get-user-by-id/:id",
      updateUser: "/update-user/:id",
      deleteUser: "/delete-user/:id",
    },
  },
  query: {
    authQuery: {
      register: "INSERT INTO user SET ?",
      getUserByCondition: "SELECT * FROM user WHERE ?",
    },
  },
};

module.exports = { variables };
