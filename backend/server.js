const app = require(`./app`);
const dotenv = require(`dotenv`);
const connectDB = require("./database/database");

//configuring the DOTENV
dotenv.config({ path: `backend/config/.env` });

//Connecting to the DB
connectDB().catch((error) => console.log(error));
app.listen(process.env.PORT, () =>
  console.log(`Server started at http://localhost:${process.env.PORT}`)
);
