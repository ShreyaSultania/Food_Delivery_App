import mongoose from "mongoose";
export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://Shreya:Shreya@cluster0.0m0bvp0.mongodb.net/food-delivery').then(()=>{
        console.log("db connected")
    });

}