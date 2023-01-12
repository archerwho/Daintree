const app = require(`./app`);
const dotenv = require(`dotenv`);
const connectDB = require("./database/database");

//Handling Uncaught Exception
process.on(`uncaughtException`, (error) => {
  console.log(`Error: ${error.message}`);
  console.log(`Shutting Down the Server due to Uncaught Exception.`);
  server.close(() => process.exit(1));
});

//configuring the DOTENV
dotenv.config({ path: `backend/config/.env` });

//Connecting to the DB
connectDB().catch((error) => console.log(error));
const server = app.listen(process.env.PORT, () =>
  console.log(`Server started at http://localhost:${process.env.PORT}`)
);

//Unhandled Promise Rejection
process.on(`unhandledRejection`, (error) => {
  console.log(`Error: ${error.message}`);
  console.log(`Shutting Down the Server due to Unhandled Promise Rejection.`);
  server.close(() => {
    process.exit(1);
  });
});

