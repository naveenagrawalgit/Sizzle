import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import { dbConnect } from "./utils/db.js";
import authRoutes from './routes/auth.js'
import recipeRoutes from './routes/recipe.route.js'
import path from 'path'
dotenv.config();
const app = express()
const port =process.env.PORT || 5000



app.use(cors())
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes)


const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}



app.listen(port, ()=>{
    dbConnect()
    console.log("server started at :--",port)
})