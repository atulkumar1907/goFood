const mongoose = require('mongoose');


const connectDB = async () => {

  const mongoose = require('mongoose'); // Assuming Mongoose is installed
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/goFood');
      console.log("Connected successfully");
  
      // Retrieve food data using modern async/await for clarity
      const foodData = await mongoose.connection.db.collection("foodData").find({}).toArray();
      global.foodData = foodData
      
      // Retrieve category data using separate await
      const catData = await mongoose.connection.db.collection("categories").find({}).toArray();
      global.catData = catData
      
      // Process and possibly combine or utilize data as needed
      // console.log("Fetched Food Data:", foodData); // Log retrieved food data
      // console.log("Fetched Category Data:", catData); // Log retrieved category data
      
      // Example usage (replace with your actual logic):
      const combinedData = foodData.map(foodItem => {
        const matchingCategory = catData.find(category => category.id === foodItem.categoryId); // Assuming a categoryId field in foodData
        return { ...foodItem, category: matchingCategory }; // Combine food and category data if applicable
      });
      // console.log("Combined Data:", combinedData); // Example of processed data (replace with your use case)
      global.CombinedData = combinedData
    } catch (err) {
      console.error("Error:", err);
    }
  };

module.exports =  connectDB;


