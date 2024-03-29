const app = require(`./app`);
const dotenv = require(`dotenv`);
const cloudinary = require(`cloudinary`);
const connectDB = require("./database/database");

//Handling Uncaught Exception
process.on(`uncaughtException`, (error) => {
  console.log(`Error: ${error.message}`);
  console.log(`Shutting Down the Server due to Uncaught Exception.`);
  // server.close(() => process.exit(1));
});

//configuring the DOTENV
dotenv.config({ path: `backend/config/.env` });

//Configuration For Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Connecting to the DB and listening to the PORT
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server started at http://localhost:${process.env.PORT}`)
    );
  })
  .catch((error) => console.log(error));

//Unhandled Promise Rejection
process.on(`unhandledRejection`, (error) => {
  console.log(`Error: ${error.message}`);
  console.log(`Shutting Down the Server due to Unhandled Promise Rejection.`);
  // server.close(() => {
  //   process.exit(1);
  // });
});
