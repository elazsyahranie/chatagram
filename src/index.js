const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
// const { v4: uuidv4 } = require('uuid')
const xss = require("xss-clean");
const helmet = require("helmet");
const compression = require("compression");
const bodyParser = require("body-parser");
// const routerNavigation = require("./routes");
const app = express();
const port = process.env.PORT;

const authRoute = require("./modules/auth/auth_route");
const userRoute = require("./modules/user/user_route");

const server = require("http").createServer(app);

app.use(morgan("dev"));
app.use(cors());
app.options("", cors());
app.use(xss());
app.use(helmet());
app.use(compression());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(authRoute, userRoute);
// app.use('/backend/api', express.static('src/uploads'))

server.listen(port, () => {
  // bagian sini ubah jadi server.listen
  console.log(`CHATAGRAM BACKEND is listen on port ${port} !`);
});
