import mongoose from "mongoose";

export async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    return new Response(
      JSON.stringify({ message: "Successfully connected to DB" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failed to connect to DB",
        error: error.message,
      }),
      {
        status: 500,
      }
    );
  }
}
