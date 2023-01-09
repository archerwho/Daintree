const mongoose = require(`mongoose`);

mongoose.set("strictQuery", false);

async function connectDB() {
  await mongoose.connect("mongodb://127.0.0.1:27017/EcommerceDB");
  console.log(`Connected to the Database`);

  //   mongoose.connection.close();
  // refer to documentation for more methods - https://mongoosejs.com/docs/index.html
}

module.exports = connectDB;
