import mongoose from "mongoose";

const connect = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      process.env.MONGODB_CONNECTION_URI!
    );
    console.log(`server connected at ${connectionInstance.connection.host}`);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default connect;
