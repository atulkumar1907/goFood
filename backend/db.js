const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/goFood');
        console.log("connected successfully");
        const fetchedData = mongoose.connection.db.collection("foodData");
        const data = await fetchedData.find({}).toArray();
        // console.log(data);
      } catch (err) {
        console.error(err);
      }
    }
module.exports = connectDB;

