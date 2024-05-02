import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
dotenv.config();
const app = express();

connectDB()

app.get("/", (req, res) => {
  res.send("API is running.....with");
});

app.use("/api/products", productRoutes)
const PORT = process.env.PORT || 5000;


app.use(notFound)
app.use(errorHandler)
app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold)
);
