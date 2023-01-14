const cookieParser = require("cookie-parser");
const express = require(`express`);
const errorMiddleware = require("./middleware/error");

const app = express();
app.use(express.json());
app.use(cookieParser())

//Route Imports
const productRoute = require(`./routes/productRoute`);
const userRoute = require(`./routes/userRoute`);

app.use(`/api/v1`, productRoute);
app.use(`/api/v1`, userRoute);
//Middleware for error
app.use(errorMiddleware);

module.exports = app;
