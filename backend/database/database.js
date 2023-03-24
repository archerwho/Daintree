const mongoose = require(`mongoose`);

mongoose.set("strictQuery", false);

async function connectDB() {
  mongoose
    .connect(process.env.DB_URL)
    .then((data) =>
      console.log(
        `Server connected to the Database, DB Host: ${data.connection.host}`
      )
    );

  //   mongoose.connection.close();
  // refer to documentation for more methods - https://mongoosejs.com/docs/index.html
}

module.exports = connectDB;
