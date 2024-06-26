import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI!);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error: unknown) {
        const err = error as { message: string };
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
};
    
export default connectDB;