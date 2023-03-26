const express = require(`express`);
const cookieParser = require("cookie-parser");
const bodyParser = require(`body-parser`);
const fileUpload = require(`express-fileupload`);
const errorMiddleware = require("./middleware/error");
const dotenv = require(`dotenv`);
const path = require("path");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());

//configuring the DOTENV
dotenv.config({ path: `backend/config/.env` });

//Route Imports
const productRoute = require(`./routes/productRoute`);
const userRoute = require(`./routes/userRoute`);
const orderRoute = require(`./routes/orderRoute`);
const paymentRoute = require(`./routes/paymentRoute`);

app.use(`/api/v1`, productRoute);
app.use(`/api/v1`, userRoute);
app.use(`/api/v1`, orderRoute);
app.use(`/api/v1`, paymentRoute);

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

//Middleware for error
app.use(errorMiddleware);

module.exports = app;
