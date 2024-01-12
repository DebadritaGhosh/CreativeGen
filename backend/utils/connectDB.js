import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb+srv://debadritaghosh:baur0nXkD2sep0yi@creativegencluster.aas1tjx.mongodb.net/creative-gen?retryWrites=true&w=majority`);
    console.log(`Mongodb connected ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
