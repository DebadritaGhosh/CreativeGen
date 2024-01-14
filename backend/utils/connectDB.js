import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb+srv://debadritaghosh:dyPW1i1fPEjYydTL@creativegen-v1-cluster.ccma8ot.mongodb.net/creativeGen?retryWrites=true&w=majority`);
    console.log(`Mongodb connected ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
