import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        const connection = await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected Successfully`);
    } catch (error) {
        console.log(`MongoDB connection error: ${error}`);
        process.exit(1);
    }
}

export default connectDB;
