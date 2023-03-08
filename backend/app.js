const express = require(`express`);
const cookieParser = require("cookie-parser");
const bodyParser = require(`body-parser`);
const fileUpload = require(`express-fileupload`);
const errorMiddleware = require("./middleware/error");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());

//Route Imports
const productRoute = require(`./routes/productRoute`);
const userRoute = require(`./routes/userRoute`);
const orderRoute = require(`./routes/orderRoute`);

app.use(`/api/v1`, productRoute);
app.use(`/api/v1`, userRoute);
app.use(`/api/v1`, orderRoute);
//Middleware for error
app.use(errorMiddleware);

module.exports = app;
