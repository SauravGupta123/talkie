import express from "express";
import path from "path";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js"
import connectToMongoDB from "./db/connectToMongoDB.js";
import messageRoutes from "./routes/message.routes.js"
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js"
import { app,server,io } from "./socket/socket.js";
dotenv.config();
const port = process.env.PORT||5000;
const __dirname = path.resolve();
app.use(cookieParser());
app.use(express.json());// to parse the incoming requests with JSON payloads (from req.body)
//sequence matters with this one.
app.use("/api/auth", authRoutes);
app.use("/api/message",messageRoutes);
app.use("/api/users",userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

 app.get("*", (req, res) => {
 	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
 });


// app.get("/",(req,res)=>
// {
//     res.send("Hello World")
// })

server.listen(port,()=>
{
    connectToMongoDB();
    console.log(`App is listening on port ${port}`)
})