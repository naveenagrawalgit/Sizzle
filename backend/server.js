import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import { dbConnect } from "./utils/db.js";
import authRoutes from './routes/auth.js'
import recipeRoutes from './routes/recipe.route.js'
dotenv.config();
const app = express()
const port =process.env.PORT || 5000



app.use(cors())
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes)



app.listen(port, ()=>{
    dbConnect()
    console.log("server started at :--",port)
})