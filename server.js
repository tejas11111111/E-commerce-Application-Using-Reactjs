// const express = require('express')
import express from "express";
// const   colors = require('colors')
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import {fileURLToPath } from 'url';
//configure the.env file
dotenv.config();
connectDB();

//esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// rest objects
const app = express();
//middlewares

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build")));
//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// rest api
// app.get('/',(req,res)=>{
//     res.send("<h1>Welcome  to  ecommerce app</h1>")

// })
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//Port
const PORT = process.env.PORT ||8080 ;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE}mode on port${PORT}`.bgCyan.white
  );
  // console.log(object)
});
