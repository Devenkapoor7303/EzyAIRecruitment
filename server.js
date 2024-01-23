import "express-async-errors";
import express from "express";
import morgon from "morgan";
import * as dotenv from "dotenv";
import connectWithDb from "./Config/db.js";
import AuthRoutes from "./Routes/AuthRouter.js";
import erroHandlerMiddleware from "./Middlewares/errorHandlerMiddleware.js";

//Configuration
dotenv.config();
connectWithDb();

const app=express();

//Middlewares
app.use(express.json());
if(process.env.NODE_ENV==="development"){
    app.use(morgon("dev"));
}

app.use("/api/v1/auth",AuthRoutes);

app.get("/api/v1",(req,res)=>{
    res.send("Hello World");
})

//Error Handler Middleware
app.use(erroHandlerMiddleware);

app.listen(process.env.PORT||5100,()=>{
    console.log("server is running");
})