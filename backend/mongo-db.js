const mongoose = require('mongoose');

const connectMongodb = async () => {
  try {
    var uri = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.fdy8bdl.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;
    await mongoose.connect(uri);
    console.log('Connection to mongodb succeeded.');
  } catch (error) {
    console.log('Connection to mongodb failed!');
  }
};

module.exports = connectMongodb;
